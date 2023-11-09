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
const parceirosAgrupados = {
  PF: [],
  PJ: [],
};

// Percorre o array combinado
const juntarArrays = ids.map((id, index) => {
  if (String(id).length === 11) {
    parceirosAgrupados.PF.push({
      parceirosID: id,
      nome: nomes[index],
    });
  } else {
    parceirosAgrupados.PJ.push({
      parceirosID: id,
      nome: nomes[index],
    });
  }
});


// Exibe o objeto com os parceiros agrupados por tipo
console.log(parceirosAgrupados);