import { Chamado } from "./Chamado.js";

export class FilaAtendimento {
  #chamados = [];

  adicionar(chamado) {
    if (!(chamado instanceof Chamado)) {
      throw new TypeError("A fila aceita apenas objetos Chamado.");
    }
    this.#chamados.push(chamado);
  }

  proximo() {
    return this.#chamados.shift() ?? null;
  }

  get tamanho() {
    return this.#chamados.length;
  }

  estaVazia() {
    return this.#chamados.length === 0;
  }

  relatorio() {
    return this.#chamados.map((c, posicao) => ({ posicao: posicao + 1, ...c.resumo() }));
  }

  resumo() {
    return { tamanho: this.tamanho, chamados: this.relatorio() };
  }
}
