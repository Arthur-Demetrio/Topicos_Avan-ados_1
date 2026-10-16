import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";

const titulo = (t) => console.log(`\n=== ${t} ===`);

titulo("Estudantes e médias");
const ana = new Estudante("2024001", "Ana Souza", "Sistemas de Informação");
const bruno = new Estudante("2024002", "Bruno Lima", "Ciência da Computação");

[8, 7.5, 9].forEach((n) => ana.adicionarNota(n));
[5, 6.5].forEach((n) => bruno.adicionarNota(n));

try {
  ana.adicionarNota(11);
} catch (e) {
  console.log("Nota rejeitada:", e.message);
}

console.log(ana.toString());
console.log(bruno.toString());

titulo("Turma e matriculados");
const turma = new Turma("POO-2026.1", "Programação Orientada a Objetos");
turma.matricular(ana, new Date("2026-02-10"));
turma.matricular(bruno, new Date("2026-02-12"));
turma.registrarFrequencia("2024001", 95);
turma.registrarFrequencia("2024002", 80);

try {
  turma.matricular(ana);
} catch (e) {
  console.log("Matrícula rejeitada:", e.message);
}
console.table(turma.listarMatriculados());

titulo("Fila de atendimento (FIFO)");
const c1 = new Chamado(1, "Erro ao acessar o portal", ana);
const c2 = new Chamado(2, "Dúvida sobre matrícula", bruno);

const fila = new FilaAtendimento();
fila.adicionar(c1);
fila.adicionar(c2);
console.log("Tamanho da fila:", fila.tamanho);
console.table(fila.relatorio());

const atual = fila.proximo();
console.log("Retirado da fila:", atual.toString());
console.log("Tamanho após retirar:", fila.tamanho);

titulo("Ciclo de vida do chamado");
try {
  atual.finalizar();
} catch (e) {
  console.log("Transição inválida:", e.message);
}
atual.iniciarAtendimento("Técnico Carlos");
console.log(atual.toString(), "| responsável:", atual.responsavel);
atual.finalizar();
console.log(atual.toString());

try {
  atual.iniciarAtendimento("Outro técnico");
} catch (e) {
  console.log("Transição inválida:", e.message);
}

console.log("Próximo na fila:", fila.proximo().toString());
console.log("Fila vazia devolve:", fila.proximo());


titulo("Encapsulamento");
const copia = ana.listarNotas();
copia.push(0, 0, 0);
console.log("Cópia alterada:", copia, "| notas reais:", ana.listarNotas());
console.log("Média de Ana continua:", ana.calcularMedia().toFixed(2));
console.log("ana.notas =", ana.notas, "| turma.vinculos =", turma.vinculos, "| fila.chamados =", fila.chamados);

try {
  ana.matricula = "999";
} catch (e) {
  console.log("Matrícula é somente leitura:", e.constructor.name);
}
console.log("Matrícula de Ana:", ana.matricula);


titulo("Resumos");
console.log(JSON.stringify(ana.resumo(), null, 2));
console.log(JSON.stringify(turma.resumo(), null, 2));
console.log(JSON.stringify(c1.resumo(), null, 2));
console.log(JSON.stringify(fila.resumo(), null, 2));
