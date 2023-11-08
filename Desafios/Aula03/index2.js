console.clear()
// Array de IDs dos parceiros
const ids = [
  19660156627897, 
  23998058019370, 
  92291338611, 
  55443795656, 
  77743761456,
  47202302326, 
  58017232567, 
  16733009491247, 
  63351859919, 
  84297701780,
];

// Array de nomes dos parceiros na mesma ordem que os IDs
const nomes = [
  "Fernanda Santos",
  "Rafael Souza",
  "Maria Silva",
  "Maria Souza",
  "Ana Costa",
  "Maria Ferreira",
  "Sofia Costa",
  "Lucas Silva",
  "Rafael Souza",
  "Carlos Oliveira",
];

// Cria um novo array combinando os arrays de IDs e nomes
// Cada elemento do novo array é um array contendo um ID e um nome
const juntarArrays = ids.map((id, nome) => {
// Converte o ID para uma string e retorna um array contendo o ID e o nome correspondente
  return [String(id), nomes[nome]];
});

// console.log(juntarArrays);

// Cria um objeto para agrupar os parceiros por tipo (PF ou PJ)
const parceirosAgrupados = {
  PF: [],
  PJ: [],
};

// Percorre o array combinado
juntarArrays.forEach((elemento) => {
  // Verifica o comprimento do ID para determinar o tipo do parceiro
  // Se o ID tiver 11 caracteres, o parceiro é do tipo PF
  // Caso contrário, o parceiro é do tipo PJ
  // Em ambos os casos o objeto é adicionado ao array correspondente ao tipo (PF ou PJ)
  if (elemento[0].length === 11) {
    parceirosAgrupados.PF.push({
      parceirosID: elemento[0],
      nome: elemento[1],
    });
  } else {
    parceirosAgrupados.PJ.push({
      parceirosID: elemento[0],
      nome: elemento[1],
    });
  }
});

// Exibe o objeto com os parceiros agrupados por tipo
console.log(parceirosAgrupados);