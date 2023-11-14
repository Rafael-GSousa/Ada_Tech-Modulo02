// 1 - Declaração de Variáveis

// Uma string que representa o recibo de venda, contendo informações sobre produtos, valores e cupons.
let reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;';

//  Uma lista vazia que será preenchida com objetos representando cada item da venda.
let listaDaVenda = []; 

// Um objeto que armazenará totais, incluindo o valor total da venda, o valor total com desconto e a quantidade total de produtos vendidos.
let totais = { valorTotal: 0, valorTotalDesconto: 0, quantidadeDeProdutos: 0 }; 


// 2 - Processamento do Recibo de Venda

// Divide a string do recibo em itens individuais usando ; como delimitador. // Itera sobre cada item (produto) na lista.
reciboDeVenda.split(';').forEach(produto => { 
    
    // Divide o item em duas partes usando '/valor' como delimitador, obtendo o nome e o restante.
    let [nome, valorCupom] = produto.split('/valor'); 

    // Verifica se há uma parte após '/valor' (se há um valor para o produto).
    if (valorCupom) {

        // Divide a parte restante usando '=cupom' como delimitador, converte os valores para números e trata casos em que a conversão falha colocando zero em seu lugar.
        let [valor, cupom] = valorCupom.split('=cupom').map(e => parseFloat(e) || 0);

        // Converte a primeira letra do nome para maiúscula.
        nome = nome.charAt(0).toUpperCase() + nome.slice(1);

// 3 - Atualização da Lista de Venda

        // Procura na lista de vendas se o produto já foi adicionado anteriormente.
        let item = listaDaVenda.find(item => item.produto === nome);

        // Se 'item' existe (produto já adicionado), incrementa a quantidade desse produto.
        if (item) {
            item.quantidade++;
        }
        // Se não existe, adiciona um novo objeto à lista contendo informações sobre o produto. 
        else {
            listaDaVenda.push({ produto: nome, valor: valor, cupom: cupom, quantidade: 1 });
        }

// 4 - Atualização dos Totais

        // Atualiza os totais com base nas informações do item atual

	// Adiciona o valor do produto ao valor total da venda.
        totais.valorTotal += valor;

	// Adiciona o valor com desconto ao valor total com desconto, onde o desconto é aplicado.
        totais.valorTotalDesconto += valor * (1 - cupom / 100);

	// Incrementa a quantidade total de produtos.
        totais.quantidadeDeProdutos++;
    }
});

// 5 - Limpa o console e exibe a lista de itens da venda e os totais calculados

// Limpa o console
console.clear();
// Exibe a lista de itens da venda no console
console.log(listaDaVenda);
// Exibe os totais da venda no console
console.log(totais);

// Este código faz o seguinte:

// Divide a string do recibo de venda em produtos individuais.
// Para cada produto, divide o nome do produto e o valor/cupom.
// Verifica se há uma parte após '/valor' para fazer o processamento.
// Divide o valor/cupom em valor e cupom.
// Converte o valor e o cupom para os tipos corretos.
// Formata o nome do produto para ter a primeira letra maiúscula.
// Procura o produto na lista de vendas.
// Se o produto já estiver na lista, incrementa a quantidade.
// Caso contrário, adiciona um novo item à lista.
// Atualiza os totais.
// Imprime a lista de vendas formatada e os totais.