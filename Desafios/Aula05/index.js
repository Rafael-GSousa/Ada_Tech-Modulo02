// limpa a entrada anterior
console.clear();

//importa a biblioteca readline-sync do NodeJS
const readline = require("readline-sync");

// cria um Array vazio para preencher com as informações de cada usuário
const pessoa = [];

// estrutura de repetição limitada a 4 iterações para preencher o Array (pessoa)
for (let i = 1; i <= 4; i++) {

  // Entradas do usuário direto no terminal do NodeJS
  console.log(`\n========== Pessoa ${i} ==========\n`);
  const nome = String(readline.question("Nome => ")).trim().toUpperCase();
  const peso = Number(readline.question("Peso (em 'Kg') => "));
  const altura = Number(readline.question("Altura (em 'm') => "));

  // Entradas do usuário direto no browser
  // const nome = String(prompt("Nome => ")).trim().toUpperCase();
  // const peso = Number(prompt("Peso (em 'Kg') => "));
  // const altura = Number(prompt("Altura (em 'm') => "));

  // cálculo do IMC
  const imc = peso / Math.pow(altura, 2);

  // variável que irá receber a classificação de cada grau do IMC
  let msg = "";

  // estrutura condicional que vai verificar em qual faixa do IMC a pessoa se encontra
  if (imc < 18.5) {
    msg = "Abaixo do peso"; // consiste nas classificações de Magreza Grau 3, 2 e 1
  } else if (imc < 25.0) {
    msg = "Peso normal"; // consiste na classificação de peso Adequado
  } else if (imc < 30.0) {
    msg = "Sobrepeso"; // consiste classificação de Pré-Obeso
  } else {
    msg = "Obesidade"; // consiste nas classificações de Obesidade Grau 1, 2 e 3
  }

  // objeto que será adicionado dentro do Array (pessoa), com as informações de cada usuário
  pessoa.push({
    nome: nome,
    peso: Number(peso.toFixed(2)),
    altura: Number(altura.toFixed(2)),
    imc: Number(imc.toFixed(1)),
    classificacao: msg,
  });
}

// imprime no console o Array preenchido com as informações dos usuários
console.log(pessoa);

// Exemplos de entrada para cada faixa de peso:

// 1. Abaixo do Peso
// peso = 45 Kg | altura = 1.70 m ==> IMC = 15.6

// 2. Peso Normal
// peso = 60 Kg | altura = 1.65 m ==> IMC = 22.0

// 3. Sobrepeso
// peso = 75 Kg | altura = 1.60 m ==> IMC = 29.3

// 4. Obesidade
// peso = 90 Kg | altura = 1.55 m ==> IMC = 37.5
