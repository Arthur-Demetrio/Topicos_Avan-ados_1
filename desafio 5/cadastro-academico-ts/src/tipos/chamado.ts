export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";
 
export const STATUS_VALIDOS: readonly StatusChamado[] = [
  "ABERTO",
  "EM_ATENDIMENTO",
  "FINALIZADO",
];
 
export interface Chamado {
  readonly id: number;
  readonly matriculaEstudante: string;
  titulo: string;
  status: StatusChamado;
  descricao?: string;
}