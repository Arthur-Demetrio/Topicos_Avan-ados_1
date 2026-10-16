const cursos = [];

function inserirCurso(cursos, codigo, nome, cargaHoraria, ativo) {
  if (typeof codigo !== "string" || codigo.trim() === "") {
    throw new Error("Código inválido.");
  }
  if (cursos.some((c) => c.codigo === codigo)) {
    throw new Error(`Já existe um curso com o código ${codigo}.`);
  }
  if (typeof nome !== "string" || nome.trim() === "") {
    throw new Error("Nome inválido.");
  }
  if (typeof cargaHoraria !== "number" || !Number.isFinite(cargaHoraria) || cargaHoraria <= 0) {
    throw new Error("Carga horária deve ser um número positivo.");
  }
  if (typeof ativo !== "boolean") {
    throw new Error("O campo ativo deve ser booleano.");
  }
  cursos.push({ codigo, nome, cargaHoraria, ativo });
}


function listarCursos(cursos) {
  return cursos.map(
    (c) => `${c.codigo} | ${c.nome} | ${c.cargaHoraria}h | ${c.ativo ? "Ativo" : "Inativo"}`
  );
}

function filtrarCursosAtivos(cursos) {
  return cursos.filter((c) => c.ativo);
}

function calcularMediaCargaHoraria(cursosAtivos) {
  if (cursosAtivos.length === 0) return 0;
  const total = cursosAtivos.reduce((soma, c) => soma + c.cargaHoraria, 0);
  return total / cursosAtivos.length;
}

inserirCurso(cursos, "SI101", "Sistemas de Informação", 3200, true);
inserirCurso(cursos, "CC202", "Ciência da Computação", 3600, true);
inserirCurso(cursos, "ADS303", "Análise e Desenvolvimento de Sistemas", 2000, true);
inserirCurso(cursos, "RC404", "Redes de Computadores", 1600, false);

try {
  inserirCurso(cursos, "SI101", "Duplicado", 100, true);
} catch (e) {
  console.log("Erro ao inserir:", e.message);
}

console.log("\n=== Todos os cursos ===");
listarCursos(cursos).forEach((linha) => console.log(linha));

const ativos = filtrarCursosAtivos(cursos);
console.log("\n=== Cursos ativos ===");
listarCursos(ativos).forEach((linha) => console.log(linha));

console.log("\n=== Relatório ===");
console.log("Total de cursos cadastrados:", cursos.length);
console.log("Total de cursos ativos:", ativos.length);
console.log("Média da carga horária dos ativos:", calcularMediaCargaHoraria(ativos).toFixed(2), "horas");
