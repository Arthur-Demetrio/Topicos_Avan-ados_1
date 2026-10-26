export type Estudante = {
  readonly matricula: string;
  nome: string;
  curso: string;
  ativo: boolean;
  notas?: number[]; // opcional: estudante pode ainda não ter notas
};
 
/** Entrada externa (formulário, JSON, API): nada é confiável. */
export type DadosEstudanteEntrada = {
  nome?: unknown;
  matricula?: unknown;
  curso?: unknown;
};
 
export type ResultadoValidacao = {
  valido: boolean;
  erros: string[];
};
 