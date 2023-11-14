const readline = require('readline-sync') //importa a biblioteca readline-sync do NodeJS
const peso = Number(readline.question('Digite seu peso em Kg => ')) // Entrada do usuário direto no terminal do NodeJS
const altura = Number(readline.question('Digite sua altura em m => ')) // Entrada do usuário direto no terminal do NodeJS

// Entradas de dados pelo browser
// const peso = Number(prompt('Digite seu peso em Kg'))
// const altura = Number(prompt('Digite sua altura em m'))

const imc = peso / Math.pow(altura, 2) // cálculo do IMC
let msg = ''; // variável onde será atribuída a mensagem

// Verificando em qual faixa de peso se enquadra o IMC
if (imc < 18.5){
  msg = 'Abaixo do peso'
} else if (imc < 24.9){
  msg = 'Peso normal'
} else if (imc < 29.9){
  msg = 'Sobrepeso'
}else {
  msg = 'Obesidade'
}

// Exibindo o resultado e a mensagem no console
console.log(`Seu IMC: ${imc.toFixed(2)}\nSua faixa: ${msg}`)