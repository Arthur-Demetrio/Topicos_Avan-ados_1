import { buscarPorMatricula } from "./estudanteservice.js";
const turmas = [];
export function criarTurma(codigo, curso, vagas) {
    const turma = { codigo, curso, matriculas: [], vagas };
    turmas.push(turma);
    return turma;
}
export function buscarTurma(codigo) {
    return turmas.find((t) => t.codigo === codigo) ?? null;
}
export function matricularNaTurma(codigo, matricula) {
    const turma = buscarTurma(codigo);
    const estudante = buscarPorMatricula(matricula);
    if (turma === null || estudante === null)
        return false;
    if (turma.vagas <= 0 || turma.matriculas.includes(matricula))
        return false;
    turma.matriculas.push(matricula);
    turma.vagas -= 1;
    return true;
}
