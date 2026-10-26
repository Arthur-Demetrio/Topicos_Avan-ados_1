import { STATUS_VALIDOS } from "../tipos/chamado.js";
const chamados = [];
let proximoId = 1;
export function ehStatusChamado(valor) {
    return typeof valor === "string" && STATUS_VALIDOS.includes(valor);
}
export function abrirChamado(matriculaEstudante, titulo, descricao) {
    const chamado = {
        id: proximoId++,
        matriculaEstudante,
        titulo,
        status: "ABERTO",
        ...(descricao !== undefined ? { descricao } : {}),
    };
    chamados.push(chamado);
    return chamado;
}
export function buscarChamado(id) {
    return chamados.find((c) => c.id === id) ?? null;
}
/** Só aceita a união StatusChamado em tempo de compilação. */
export function listarPorStatus(status) {
    return chamados.filter((c) => c.status === status);
}
export function atualizarStatus(id, novoStatus) {
    const chamado = buscarChamado(id);
    if (chamado === null)
        return null;
    chamado.status = novoStatus;
    return chamado;
}
/** Variante para entrada externa: recusa status inválidos em tempo de execução. */
export function atualizarStatusExterno(id, novoStatus) {
    if (!ehStatusChamado(novoStatus))
        return null;
    return atualizarStatus(id, novoStatus);
}
