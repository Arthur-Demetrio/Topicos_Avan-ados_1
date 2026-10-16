import {
  cadastrarAluno, buscarPorMatricula, removerPorMatricula, avaliarAluno, calcularMedia,
} from "./alunos.js";
import { criarFiltroPorMediaMinima, criarFiltroPorCurso } from "./filtros.js";
import {
  gerarRelatorio, porNome, relatorioAprovados, relatorioReprovados,
  relatorioCursoCsv, resumoPorCurso,
} from "./relatorios.js";

const alunos = [];
const secao = (t) => console.log(`\n=== ${t} ===`);
const imprimir = (linhas, vazio = "(nenhum registro)") =>
  console.log(linhas.length ? linhas.join("\n") : vazio);
const tentar = (descricao, fn) => {
  try { fn(); } catch (e) { console.log(`[rejeitado] ${descricao}: ${e.message}`); }
};

secao("Cadastro e normalização");
const base = [
  { matricula: " 2024-001 ", nome: "  ana   souza ", email: " ANA@Mail.com ", curso: "sistemas de informação", notas: [8, 7.5, 9] },
  { matricula: "2024-002", nome: "bruno lima", email: "bruno@mail.com", curso: "Sistemas de Informação", notas: [5, 6.5] },
  { matricula: "2024-003", nome: "carla de oliveira", email: "carla@mail.com", curso: "Ciência da Computação", notas: [10, 9.5] },
  { matricula: "2024-004", nome: "diego rocha", email: "diego@mail.com", curso: "Ciência da Computação", notas: [4, 3.5, 6] },
  { matricula: "2024-005", nome: "elisa matos", email: "elisa@mail.com", curso: "Ciência da Computação" }, // sem notas
  { matricula: "2024-006", nome: "fábio, o \"Jr\"", email: "fabio@mail.com", curso: "Sistemas de Informação", notas: [6, 6] },
];
base.forEach((d) => cadastrarAluno(alunos, d));
console.log(buscarPorMatricula(alunos, "2024-001"));

secao("Validações");
tentar("matrícula duplicada", () => cadastrarAluno(alunos, { ...base[0], matricula: "2024-001" }));
tentar("nome curto", () => cadastrarAluno(alunos, { matricula: "X1", nome: "Al", email: "a@b.com", curso: "SI" }));
tentar("e-mail inválido", () => cadastrarAluno(alunos, { matricula: "X2", nome: "Gabriel", email: "gabriel-at-mail", curso: "SI" }));
tentar("nota fora da faixa", () => cadastrarAluno(alunos, { matricula: "X3", nome: "Helena", email: "h@mail.com", curso: "SI", notas: [7, 10.5] }));

secao("Média e situação sem alterar o original");
const original = buscarPorMatricula(alunos, "2024-002");
const avaliado = avaliarAluno(original, { mediaMinima: 5 });
console.log("original :", original);
console.log("avaliado :", avaliado);

secao("Busca e remoção");
console.log("buscar inexistente:", buscarPorMatricula(alunos, "9999"));
console.log("removido:", removerPorMatricula(alunos, "2024-006")?.nome);
console.log("remover inexistente:", removerPorMatricula(alunos, "9999"));

secao("1) Aprovados por nome (média mínima padrão 6)");
imprimir(relatorioAprovados(alunos));

secao("2) Reprovados da menor para a maior média");
imprimir(relatorioReprovados(alunos));

secao("3) Curso em CSV");
imprimir(relatorioCursoCsv(alunos, "ciencia da computacao"));

secao("4) Resumo por curso");
imprimir(resumoPorCurso(alunos));

secao("Closure: filtro por média mínima 8 (ordem por nome)");
const acimaDe8 = criarFiltroPorMediaMinima(8);
imprimir(gerarRelatorio(alunos, acimaDe8, (a) => `${a.nome}: ${calcularMedia(a).toFixed(2)}`, porNome));

secao("Closure: filtro por curso, sem comparador");
imprimir(gerarRelatorio(alunos, criarFiltroPorCurso("Sistemas de Informacao"), (a) => a.nome));

secao("Casos de borda");
console.log("Coleção vazia (aprovados):");
imprimir(relatorioAprovados([]), "(nenhum aprovado)");
console.log("Coleção vazia (resumo):");
imprimir(resumoPorCurso([]), "(sem cursos)");
console.log("Curso inexistente (CSV):");
imprimir(relatorioCursoCsv(alunos, "Medicina"), "(curso não encontrado ou sem alunos)");
console.log("Aluno sem notas — situação:", avaliarAluno(buscarPorMatricula(alunos, "2024-005")).situacao);
console.log("Média mínima configurável (7) — aprovados:");
imprimir(relatorioAprovados(alunos, { mediaMinima: 7 }));
