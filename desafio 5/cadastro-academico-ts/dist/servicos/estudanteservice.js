import { ehEntradaValida } from "../validação/validarestudante.js";
const estudantes = [];
export function cadastrarEstudante(dados) {
    if (!ehEntradaValida(dados))
        return null;
    const matricula = dados.matricula.trim();
    if (buscarPorMatricula(matricula) !== null)
        return null; // duplicada
    const curso = typeof dados.curso === "string" && dados.curso.trim() !== ""
        ? dados.curso.trim()
        : "Não informado";
    const novo = {
        matricula,
        nome: dados.nome.trim(),
        curso,
        ativo: true,
    };
    estudantes.push(novo);
    return novo;
}
export function buscarPorMatricula(matricula) {
    return estudantes.find((e) => e.matricula === matricula) ?? null;
}
export function listarEstudantes() {
    return estudantes;
}
export function registrarNotas(matricula, notas) {
    const estudante = buscarPorMatricula(matricula);
    if (estudante === null)
        return false;
    estudante.notas = notas;
    return true;
}
export function calcularMedia(notas) {
    if (notas.length === 0)
        return 0;
    const soma = notas.reduce((acc, n) => acc + n, 0);
    return soma / notas.length;
}
/** null quando o estudante não existe ou ainda não tem notas. */
export function mediaDoEstudante(matricula) {
    const estudante = buscarPorMatricula(matricula);
    if (estudante === null || estudante.notas === undefined)
        return null;
    return calcularMedia(estudante.notas);
}
