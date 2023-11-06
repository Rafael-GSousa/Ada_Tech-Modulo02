// console.clear();

const star1 = document.querySelector("#star1").textContent;
const star2 = document.querySelector("#star2").textContent;
const star3 = document.querySelector("#star3").textContent;
const star4 = document.querySelector("#star4").textContent;
const star5 = document.querySelector("#star5").textContent;
const botao = document.querySelector("#botao");
const btn = document.querySelector("#btn");
const mostra = document.querySelector("#exibeMedia");
const saida = document.querySelector("#saida");
let md = 0;

botao.addEventListener('click', media)

function media() {
  md = (Number(star1 * 1) + Number(star2 * 2) + Number(star3 * 3) + Number(star4 * 4) + Number(star5 * 5)) / 100;
  saida.innerHTML = md.toFixed(1) + ' ⭐ '
  mostra.style.display = 'block'
  btn.style.display = 'none'

  console.log(`A média das avaliações é de ${md.toFixed(1)} estrelas.`);

}

