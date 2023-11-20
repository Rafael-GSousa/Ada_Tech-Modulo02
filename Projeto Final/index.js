const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];

function adicionarTarefa(id, titulo, descricao) {
    if (!titulo || !descricao) {
        console.log("Título e descrição não podem estar vazios.");
        return menu();
    }
    if (typeof titulo === 'number') {
        console.log("O título não deve conter apenas números.");
        return menu();
    }
    if (titulo.length < 4) {
        console.log("O título deve ter no mínimo 4 caracteres.");
        return menu();
    }
    if (descricao.length < 20) {
        console.log("A descrição deve ter no mínimo 20 caracteres.");
        return menu();
    }
    if (tarefas.some(tarefa => tarefa.titulo === titulo)) {
        console.log("Não deve haver tarefas com o título duplicado.");
        return menu();
    }
    tarefas.push({ id, titulo, descricao });
    console.log("Tarefa adicionada com sucesso!");
    menu();
}

function editarTarefa(id, novoTitulo, novaDescricao) {
    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    if (tarefa) {
        tarefa.titulo = novoTitulo;
        tarefa.descricao = novaDescricao;
        console.log("Tarefa editada com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
    menu();
}

function removerTarefa(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        tarefas.splice(index, 1);
        console.log("Tarefa removida com sucesso!");
    } else {
        console.log("Tarefa não encontrada!");
    }
    menu();
}

function listarTarefas() {
    console.log(tarefas);
    menu();
}

function obterTarefa(id) {
    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    if (tarefa) {
        console.log(tarefa);
    } else {
        console.log("Tarefa não encontrada!");
    }
    menu();
}

function menu() {
    console.log(`
    1. Adicionar tarefa
    2. Editar tarefa
    3. Remover tarefa
    4. Listar tarefas
    5. Obter tarefa
    6. Sair
    `);

    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao) {
            case '1':
                rl.question('Digite o id, título e descrição da tarefa (separados por vírgula): ', (input) => {
                    const [id, titulo, descricao] = input.split(',');
                    adicionarTarefa(id, titulo.trim(), descricao.trim());
                });
                break;
            case '2':
                rl.question('Digite o id, novo título e nova descrição da tarefa (separados por vírgula): ', (input) => {
                    const [id, novoTitulo, novaDescricao] = input.split(',');
                    editarTarefa(id, novoTitulo.trim(), novaDescricao.trim());
                });
                break;
            case '3':
                rl.question('Digite o id da tarefa que deseja remover: ', (id) => {
                    removerTarefa(id);
                });
                break;
            case '4':
                listarTarefas();
                break;
            case '5':
                rl.question('Digite o id da tarefa que deseja obter: ', (id) => {
                    obterTarefa(id);
                });
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Opção inválida!');
                menu();
        }
    });
}

menu();
