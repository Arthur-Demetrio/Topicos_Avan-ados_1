import { Estudante } from "./Estudante.js";
import { configuracao } from "../config/configuracao.js";


export class VinculoNaTurma {
  #estudante;
  #dataEntrada;
  #frequencia;

  constructor(estudante, dataEntrada = new Date()) {
    if (!(estudante instanceof Estudante)) {
      throw new TypeError("O vínculo exige um Estudante.");
    }
    this.#estudante = estudante;
    this.#dataEntrada = new Date(dataEntrada);
    this.#frequencia = configuracao.frequenciaInicial;
  }

  get estudante() {
    return this.#estudante;
  }

  get dataEntrada() {
    return new Date(this.#dataEntrada);
  }

  get frequencia() {
    return this.#frequencia;
  }

  atualizarFrequencia(percentual) {
    if (typeof percentual !== "number" || !Number.isFinite(percentual) || percentual < 0 || percentual > 100) {
      throw new RangeError("Frequência deve estar entre 0 e 100.");
    }
    this.#frequencia = percentual;
  }

  resumo() {
    return {
      nome: this.#estudante.nome,
      matricula: this.#estudante.matricula,
      dataEntrada: this.#dataEntrada.toLocaleDateString("pt-BR", { timeZone: "UTC" }),
      frequencia: `${this.#frequencia}%`,
    };
  }
}
