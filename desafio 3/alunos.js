import { MEDIA_MINIMA_PADRAO, NOTA_MINIMA, NOTA_MAXIMA, SITUACAO } from "./config.js";

let proximoId = 1;

const colapsar = (texto) => texto.trim().replace(/\s+/g, " ");
const PARTICULAS = new Set(["da", "de", "do", "das", "dos", "e"]);

function capitalizar(texto) {
  return colapsar(texto)
    .toLowerCase()
    .split(" ")
    .map((p, i) => (i > 0 && PARTICULAS.has(p) ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(" ");
}

export function chaveTexto(texto) {
  return colapsar(String(texto)).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export const normalizarMatricula = (m) => String(m).replace(/\s+/g, "").toUpperCase();

function exigirTexto(valor, campo) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw new Error(`${campo} é obrigatório.`);
  }
}

function validarNotas(notas) {
  if (!Array.isArray(notas)) throw new Error("Notas devem ser um array.");
  for (const nota of notas) {
    if (typeof nota !== "number" || !Number.isFinite(nota) || nota < NOTA_MINIMA || nota > NOTA_MAXIMA) {
      throw new RangeError(`Nota inválida (${nota}): deve ser um número entre ${NOTA_MINIMA} e ${NOTA_MAXIMA}.`);
    }
  }
}

function validarMediaMinima(mediaMinima) {
  if (typeof mediaMinima !== "number" || !Number.isFinite(mediaMinima) || mediaMinima < NOTA_MINIMA || mediaMinima > NOTA_MAXIMA) {
    throw new RangeError(`Média mínima inválida (${mediaMinima}).`);
  }
}

const copiar = (aluno) => ({ ...aluno, notas: [...aluno.notas] });

export function cadastrarAluno(alunos, dados) {
  if (!dados || typeof dados !== "object") throw new Error("Dados do aluno são obrigatórios.");
  const { matricula, nome, email, curso, notas = [] } = dados;

  exigirTexto(matricula, "Matrícula");
  exigirTexto(nome, "Nome");
  exigirTexto(email, "E-mail");
  exigirTexto(curso, "Curso");

  const matriculaNormalizada = normalizarMatricula(matricula);
  const nomeNormalizado = capitalizar(nome);
  const emailNormalizado = email.trim().toLowerCase();

  if (nomeNormalizado.length < 3) throw new Error("Nome deve ter ao menos 3 caracteres.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
    throw new Error(`E-mail inválido: ${email}.`);
  }
  validarNotas(notas);
  if (alunos.some((a) => a.matricula === matriculaNormalizada)) {
    throw new Error(`Matrícula duplicada: ${matriculaNormalizada}.`);
  }

  const aluno = {
    id: proximoId++,
    matricula: matriculaNormalizada,
    nome: nomeNormalizado,
    email: emailNormalizado,
    curso: capitalizar(curso),
    notas: [...notas],
  };
  alunos.push(aluno);
  return copiar(aluno);
}

export function buscarPorMatricula(alunos, matricula) {
  const alvo = normalizarMatricula(matricula);
  const aluno = alunos.find((a) => a.matricula === alvo);
  return aluno ? copiar(aluno) : null;
}

export function removerPorMatricula(alunos, matricula) {
  const alvo = normalizarMatricula(matricula);
  const indice = alunos.findIndex((a) => a.matricula === alvo);
  if (indice === -1) return null;
  const [removido] = alunos.splice(indice, 1);
  return removido;
}

export function calcularMedia(aluno) {
  if (aluno.notas.length === 0) return null;
  return aluno.notas.reduce((soma, n) => soma + n, 0) / aluno.notas.length;
}

export function calcularSituacao(aluno, { mediaMinima = MEDIA_MINIMA_PADRAO } = {}) {
  validarMediaMinima(mediaMinima);
  const media = calcularMedia(aluno);
  if (media === null) return SITUACAO.SEM_NOTAS;
  return media >= mediaMinima ? SITUACAO.APROVADO : SITUACAO.REPROVADO;
}

export function avaliarAluno(aluno, opcoes) {
  return { ...copiar(aluno), media: calcularMedia(aluno), situacao: calcularSituacao(aluno, opcoes) };
}
