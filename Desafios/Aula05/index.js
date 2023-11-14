const readline = require('readline-sync')
const peso = Number(readline.question('Digite seu peso em Kg => '))
const altura = Number(readline.question('Digite sua altura em m => '))
// const peso = Number(prompt('Digite seu peso em Kg'))
// const altura = Number(prompt('Digite sua altura em m'))
const imc = peso / Math.pow(altura, 2)
let msg = '';
if (imc < 18.5){
  msg = 'Abaixo do peso'
} else if (imc < 24.9){
  msg = 'Peso normal'
} else if (imc < 29.9){
  msg = 'Sobrepeso'
}else {
  msg = 'Obesidade'
}
console.log(`Seu IMC: ${imc.toFixed(2)}\nSua faixa: ${msg}`)