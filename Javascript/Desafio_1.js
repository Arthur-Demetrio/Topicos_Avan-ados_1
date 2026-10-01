const prompt = require('prompt-sync')();
const quantalunos = prompt("digite a quantidade de alunos: ")
for( let i = 1; i <= quantalunos; ++i) {
    let nomeAluno = prompt('Digite o nome do aluno: ');
    let matricula = prompt('Digite a matrícula do aluno: ')
    let somanotas = 0;
    for (let i = 1; i <= 3; i++) {
    let notas = (prompt(`digite a nota ${i}:`));
    let nota = parseInt(notas)
    somanotas += nota;
}
    let mediaAluno = somanotas / 3;
    let frequencia = parseInt(prompt('Digite a frequencia do aluno(0-100):'));

    let situação;
    if(mediaAluno >= 7 && frequencia >= 75){
        situação = "Aprovado";
    }else if(mediaAluno >=4 && frequencia >=75){
        situação = "Recuperação";
    }else{
        situação = "Reprovado";
}
    console.log(`---- Relatório do Aluno ${i} -----`);
    console.log("nome: ", nomeAluno);
    console.log("matrícula: ", matricula)
    console.log("média: ", mediaAluno.toFixed(2));
    console.log("Frequência: ", frequencia + "%");
    console.log("Situação: ", situação)
    console.log(`-----------------------------------`);
}