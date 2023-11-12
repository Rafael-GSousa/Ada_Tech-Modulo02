// A string do recibo de venda
let reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;';

// A lista de vendas que será preenchida
let listaDaVenda = [];

// Os totais que serão calculados
let totais = {
    valorTotal: 0,
    valorTotalDesconto: 0,
    quantidadeDeProdutos: 0
};

// Divide a string do recibo em produtos individuais
let produtos = reciboDeVenda.split(';');
console.log(produtos)