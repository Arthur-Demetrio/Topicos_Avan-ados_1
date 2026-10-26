import { cadastrarEstudante, registrarNotas, mediaDoEstudante } from "./servicos/estudanteservice.js";
import { abrirChamado, atualizarStatus, atualizarStatusExterno, listarPorStatus } from "./servicos/chamadoservice.js";
import { criarTurma, matricularNaTurma } from "./servicos/turmaservice.js";
import { validarEstudante } from "./validação/validarestudante.js";
 
const entradaBoa = JSON.parse('{"nome":"Ana Souza","matricula":"20261234567","curso":"TADS"}') as unknown;
const entradaRuim = { nome: 42, matricula: "abc" };
 
console.log(validarEstudante(entradaRuim));
 
if (typeof entradaBoa === "object" && entradaBoa !== null) {
  const estudante = cadastrarEstudante(entradaBoa);
  if (estudante !== null) {
    registrarNotas(estudante.matricula, [8, 7.5, 9]);
    console.log("Média:", mediaDoEstudante(estudante.matricula));
 
    const turma = criarTurma("TADS-2026.1", "TADS", 30);
    console.log("Matriculado:", matricularNaTurma(turma.codigo, estudante.matricula));
 
    const chamado = abrirChamado(estudante.matricula, "Erro no diário");
    atualizarStatus(chamado.id, "EM_ATENDIMENTO");
    console.log("Status inválido recusado:", atualizarStatusExterno(chamado.id, "CANCELADO") === null);
    console.log("Em atendimento:", listarPorStatus("EM_ATENDIMENTO"));
 
  }
}