import { STATUS_VALIDOS, type Chamado, type StatusChamado } from "../tipos/chamado.js";
 
const chamados: Chamado[] = [];
let proximoId = 1;
 
export function ehStatusChamado(valor: unknown): valor is StatusChamado {
  return typeof valor === "string" && (STATUS_VALIDOS as readonly string[]).includes(valor);
}
 
export function abrirChamado(
  matriculaEstudante: string,
  titulo: string,
  descricao?: string
): Chamado {
  const chamado: Chamado = {
    id: proximoId++,
    matriculaEstudante,
    titulo,
    status: "ABERTO",
    ...(descricao !== undefined ? { descricao } : {}),
  };
  chamados.push(chamado);
  return chamado;
}
 
export function buscarChamado(id: number): Chamado | null {
  return chamados.find((c) => c.id === id) ?? null;
}
 
/** Só aceita a união StatusChamado em tempo de compilação. */
export function listarPorStatus(status: StatusChamado): Chamado[] {
  return chamados.filter((c) => c.status === status);
}
 
export function atualizarStatus(id: number, novoStatus: StatusChamado): Chamado | null {
  const chamado = buscarChamado(id);
  if (chamado === null) return null;
  chamado.status = novoStatus;
  return chamado;
}
 
/** Variante para entrada externa: recusa status inválidos em tempo de execução. */
export function atualizarStatusExterno(id: number, novoStatus: unknown): Chamado | null {
  if (!ehStatusChamado(novoStatus)) return null;
  return atualizarStatus(id, novoStatus);
}