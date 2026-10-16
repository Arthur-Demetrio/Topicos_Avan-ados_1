import { chaveTexto, calcularMedia, calcularSituacao } from "./alunos.js";
import { criarFiltroPorCurso, criarFiltroPorSituacao } from "./filtros.js";
import { SITUACAO, MEDIA_MINIMA_PADRAO } from "./config.js";

const fmt = (valor) => (valor === null ? "sem notas" : valor.toFixed(2));

export const porNome = (a, b) => a.nome.localeCompare(b.nome, "pt-BR");
export const porMediaCrescente = (a, b) => calcularMedia(a) - calcularMedia(b);


export function gerarRelatorio(alunos, filtrar, formatar, comparar) {
  if (!Array.isArray(alunos)) throw new TypeError("alunos deve ser um array.");
  if (typeof filtrar !== "function") throw new TypeError("filtrar deve ser uma função.");
  if (typeof formatar !== "function") throw new TypeError("formatar deve ser uma função.");
  if (comparar !== undefined && typeof comparar !== "function") {
    throw new TypeError("comparar, quando informado, deve ser uma função.");
  }

  const selecionados = alunos.filter((a) => filtrar(a)); // filter devolve novo array
  if (comparar) selecionados.sort(comparar);
  return selecionados.map((a) => formatar(a));
}

export function relatorioAprovados(alunos, opcoes) {
  return gerarRelatorio(
    alunos,
    criarFiltroPorSituacao(SITUACAO.APROVADO, opcoes),
    (a) => `${a.nome} (${a.matricula}) - média ${fmt(calcularMedia(a))}`,
    porNome
  );
}

export function relatorioReprovados(alunos, opcoes) {
  return gerarRelatorio(
    alunos,
    criarFiltroPorSituacao(SITUACAO.REPROVADO, opcoes),
    (a) => `${a.nome} (${a.matricula}) - média ${fmt(calcularMedia(a))}`,
    porMediaCrescente
  );
}

const CABECALHO_CSV = "matricula,nome,email,curso,media,situacao";
const campoCsv = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function relatorioCursoCsv(alunos, curso, opcoes) {
  const linhas = gerarRelatorio(
    alunos,
    criarFiltroPorCurso(curso),
    (a) => {
      const media = calcularMedia(a);
      return [
        a.matricula, a.nome, a.email, a.curso,
        media === null ? "" : media.toFixed(2),
        calcularSituacao(a, opcoes),
      ].map(campoCsv).join(",");
    },
    porNome
  );
  return linhas.length === 0 ? [] : [CABECALHO_CSV, ...linhas];
}

export function resumoPorCurso(alunos) {
  if (!Array.isArray(alunos)) throw new TypeError("alunos deve ser um array.");

  const grupos = new Map();
  for (const aluno of alunos) {
    const chave = chaveTexto(aluno.curso);
    if (!grupos.has(chave)) grupos.set(chave, { curso: aluno.curso, quantidade: 0, medias: [] });
    const grupo = grupos.get(chave);
    grupo.quantidade++;
    const media = calcularMedia(aluno);
    if (media !== null) grupo.medias.push(media);
  }

  return gerarRelatorio(
    [...grupos.values()],
    () => true,
    (g) => {
      const mediaGeral = g.medias.length ? g.medias.reduce((s, m) => s + m, 0) / g.medias.length : null;
      return `${g.curso}: ${g.quantidade} aluno(s) | média geral ${fmt(mediaGeral)}`;
    },
    (a, b) => a.curso.localeCompare(b.curso, "pt-BR")
  );
}

export { MEDIA_MINIMA_PADRAO };
