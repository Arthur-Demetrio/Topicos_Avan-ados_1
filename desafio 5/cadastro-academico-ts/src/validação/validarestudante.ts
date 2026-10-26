import type { DadosEstudanteEntrada, ResultadoValidacao } from "../tipos/estudante.js";
 
const FORMATO_MATRICULA = /^\d{10,14}$/;
 
export function validarEstudante(dados: DadosEstudanteEntrada): ResultadoValidacao {
  const erros: string[] = [];
  const { nome, matricula } = dados; // ambos: unknown
 
  if (typeof nome !== "string" || nome.trim() === "") {
    erros.push("nome é obrigatório e deve ser texto não vazio");
  } else if (nome.trim().length < 3) {
    erros.push("nome deve ter ao menos 3 caracteres");
  }
 
  if (typeof matricula !== "string" || matricula.trim() === "") {
    erros.push("matricula é obrigatória e deve ser texto");
  } else if (!FORMATO_MATRICULA.test(matricula.trim())) {
    erros.push("matricula deve conter de 10 a 14 dígitos");
  }
 
  return { valido: erros.length === 0, erros };
}
 
export function ehEntradaValida(
  dados: DadosEstudanteEntrada
): dados is DadosEstudanteEntrada & { nome: string; matricula: string } {
  return validarEstudante(dados).valido;
}