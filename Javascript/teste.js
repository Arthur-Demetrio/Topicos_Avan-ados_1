const prompt = require('prompt-sync')();

const nomeAluno = prompt('Digite o nome do aluno: ');
const quantnotas = number(prompt('Quantas notas deseja informar?'));
let somanotas = 0;
for (let i = 1; i <= quantidadeNotas; i++) {
    const nota = number(prompt('digite a nota ${i}:'));
    somanotas += nota;

}
const mediaAluno = somanotas / quantnotas;
const frequencia = number(prompt('Digite a frequencia do aluno(0-100):'));

let situação;
if(mediaAluno >= 7 && frequencia >= 75){
    situação = "Aprovado";
} else if(mediaAluno >=4 && frequencia >=75){
    situação = "Recuperação";
}
else{
    situação = "Reprovado";
}

console.log("---- Relatório do Aluno -----");
console.log("nome:", nomeAluno);
console.log("média:", mediaAluno.toFixed(2));
console.log("Frequência:", frequencia + "%");
console.log("Situação:", situação)