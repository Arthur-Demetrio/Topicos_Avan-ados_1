import { Estudante } from "./Estudante.js";
import { VinculoNaTurma } from "./VinculoNaTurma.js";

export class Turma {
  #vinculos = new Map(); 

  codigo;
  componenteCurricular;

  constructor(codigo, componenteCurricular) {
    this.codigo = codigo;
    this.componenteCurricular = componenteCurricular;
  }

  matricular(estudante, dataEntrada = new Date()) {
    if (!(estudante instanceof Estudante)) {
      throw new TypeError("Somente estudantes podem ser matriculados.");
    }
    if (this.#vinculos.has(estudante.matricula)) {
      throw new Error(`Matrícula duplicada: ${estudante.matricula} já está na turma ${this.codigo}.`);
    }
    this.#vinculos.set(estudante.matricula, new VinculoNaTurma(estudante, dataEntrada));
  }

  estaMatriculado(matricula) {
    return this.#vinculos.has(matricula);
  }

  registrarFrequencia(matricula, percentual) {
    const vinculo = this.#vinculos.get(matricula);
    if (!vinculo) {
      throw new Error(`Matrícula ${matricula} não encontrada na turma ${this.codigo}.`);
    }
    vinculo.atualizarFrequencia(percentual);
  }

  get totalMatriculados() {
    return this.#vinculos.size;
  }

  listarMatriculados() {
    return [...this.#vinculos.values()].map((v) => v.resumo());
  }
  
  resumo() {
    return {
      codigo: this.codigo,
      componenteCurricular: this.componenteCurricular,
      totalMatriculados: this.totalMatriculados,
      matriculados: this.listarMatriculados(),
    };
  }
}
