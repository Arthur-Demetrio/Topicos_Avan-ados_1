import type { Turma } from "../tipos/turma.js";
import { buscarPorMatricula } from "./estudanteservice.js";
 
const turmas: Turma[] = [];
 
export function criarTurma(codigo: string, curso: string, vagas: number): Turma {
  const turma: Turma = { codigo, curso, matriculas: [], vagas };
  turmas.push(turma);
  return turma;
}
 
export function buscarTurma(codigo: string): Turma | null {
  return turmas.find((t) => t.codigo === codigo) ?? null;
}
 
export function matricularNaTurma(codigo: string, matricula: string): boolean {
  const turma = buscarTurma(codigo);
  const estudante = buscarPorMatricula(matricula);
  if (turma === null || estudante === null) return false;
  if (turma.vagas <= 0 || turma.matriculas.includes(matricula)) return false;
  turma.matriculas.push(matricula);
  turma.vagas -= 1;
  return true;
}
 