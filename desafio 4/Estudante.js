import { configuracao } from "../config/configuracao.js";

export class Estudante {
 
  #matricula;
  #notas = [];

  nome;
  curso;

  constructor(matricula, nome, curso) {
    if (!matricula || !String(matricula).trim()) {
      throw new Error("Matrícula é obrigatória.");
    }
    this.#matricula = String(matricula).trim();
    this.nome = nome;
    this.curso = curso;
  }

  get matricula() {
    return this.#matricula;
  }

  adicionarNota(nota) {
    const { notaMinima, notaMaxima } = configuracao;
    if (typeof nota !== "number" || !Number.isFinite(nota) || nota < notaMinima || nota > notaMaxima) {
      throw new RangeError(`Nota inválida (${nota}): deve estar entre ${notaMinima} e ${notaMaxima}.`);
    }
    this.#notas.push(nota);
  }

  listarNotas() {
    return [...this.#notas];
  }

  calcularMedia() {
    if (this.#notas.length === 0) return null;
    const soma = this.#notas.reduce((acc, n) => acc + n, 0);
    return soma / this.#notas.length;
  }

  estaAprovado() {
    const media = this.calcularMedia();
    return media !== null && media >= configuracao.mediaMinimaAprovacao;
  }

  resumo() {
    const media = this.calcularMedia();
    return {
      matricula: this.#matricula,
      nome: this.nome,
      curso: this.curso,
      notas: this.listarNotas(),
      media: media === null ? null : Number(media.toFixed(2)),
    };
  }

  toString() {
    const media = this.calcularMedia();
    return `${this.nome} (${this.#matricula}) - ${this.curso} - média: ${media === null ? "sem notas" : media.toFixed(2)}`;
  }
}
