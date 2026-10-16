import { chaveTexto, calcularMedia, calcularSituacao } from "./alunos.js";
import { NOTA_MINIMA, NOTA_MAXIMA } from "./config.js";

export function criarFiltroPorMediaMinima(mediaMinima) {
  if (typeof mediaMinima !== "number" || !Number.isFinite(mediaMinima) || mediaMinima < NOTA_MINIMA || mediaMinima > NOTA_MAXIMA) {
    throw new RangeError(`Média mínima inválida (${mediaMinima}).`);
  }
  return (aluno) => {
    const media = calcularMedia(aluno);
    return media !== null && media >= mediaMinima;
  };
}

export function criarFiltroPorCurso(curso) {
  const chave = chaveTexto(curso);
  return (aluno) => chaveTexto(aluno.curso) === chave;
}

export function criarFiltroPorSituacao(situacao, opcoes) {
  return (aluno) => calcularSituacao(aluno, opcoes) === situacao;
}
