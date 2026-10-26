import { test } from "node:test";
import assert from "node:assert/strict";
import { validarEstudante } from "./validação/validarestudante.js";
import { cadastrarEstudante, calcularMedia } from "./servicos/estudanteservice.js";
import { abrirChamado, atualizarStatusExterno } from "./servicos/chamadoservice.js";
test("validarEstudante recusa nome numérico e matrícula curta", () => {
    const r = validarEstudante({ nome: 42, matricula: "abc" });
    assert.equal(r.valido, false);
    assert.equal(r.erros.length, 2);
});
test("validarEstudante aceita dados válidos", () => {
    const r = validarEstudante({ nome: "Ana Souza", matricula: "20261234567" });
    assert.equal(r.valido, true);
    assert.deepEqual(r.erros, []);
});
test("cadastrarEstudante retorna null para entrada inválida", () => {
    assert.equal(cadastrarEstudante({ nome: "", matricula: 123 }), null);
});
test("calcularMedia", () => {
    assert.equal(calcularMedia([8, 7, 9]), 8);
    assert.equal(calcularMedia([]), 0);
});
test("atualizarStatusExterno recusa status inválido", () => {
    const chamado = abrirChamado("20261234567", "Teste");
    assert.equal(atualizarStatusExterno(chamado.id, "CANCELADO"), null);
    assert.equal(chamado.status, "ABERTO");
});
