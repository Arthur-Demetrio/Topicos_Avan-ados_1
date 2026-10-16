import { Estudante } from "./Estudante.js";

export const StatusChamado = Object.freeze({
  ABERTO: "ABERTO",
  EM_ATENDIMENTO: "EM_ATENDIMENTO",
  FINALIZADO: "FINALIZADO",
});

export class Chamado {
  #id;
  #titulo;
  #solicitante;
  #responsavel = null;
  #status = StatusChamado.ABERTO;

  constructor(id, titulo, solicitante) {
    if (!(solicitante instanceof Estudante)) {
      throw new TypeError("O solicitante deve ser um Estudante.");
    }
    this.#id = id;
    this.#titulo = titulo;
    this.#solicitante = solicitante;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get solicitante() {
    return this.#solicitante;
  }

  get responsavel() {
    return this.#responsavel;
  }

  get status() {
    return this.#status;
  }

  iniciarAtendimento(responsavel) {
    if (this.#status !== StatusChamado.ABERTO) {
      throw new Error(`Chamado #${this.#id}: só é possível iniciar atendimento a partir de ABERTO (atual: ${this.#status}).`);
    }
    if (!responsavel || !String(responsavel).trim()) {
      throw new Error("Informe o responsável pelo atendimento.");
    }
    this.#responsavel = String(responsavel).trim();
    this.#status = StatusChamado.EM_ATENDIMENTO;
  }

  finalizar() {
    if (this.#status !== StatusChamado.EM_ATENDIMENTO) {
      throw new Error(`Chamado #${this.#id}: só é possível finalizar a partir de EM_ATENDIMENTO (atual: ${this.#status}).`);
    }
    this.#status = StatusChamado.FINALIZADO;
  }

  resumo() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      solicitante: this.#solicitante.nome,
      matriculaSolicitante: this.#solicitante.matricula,
      responsavel: this.#responsavel,
      status: this.#status,
    };
  }

  toString() {
    return `#${this.#id} [${this.#status}] ${this.#titulo} - ${this.#solicitante.nome}`;
  }
}
