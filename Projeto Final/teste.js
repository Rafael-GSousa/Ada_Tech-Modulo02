const readline = require('readline');

// Cria uma interface de leitura e escrita
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definindo um array para armazenar as tarefas
let tasks = [];

// Função para exibir o menu
function showMenu() {
    console.log("\n===== Menu =====");
    console.log("1. Adicionar uma tarefa");
    console.log("2. Editar uma tarefa");
    console.log("3. Remover uma tarefa");
    console.log("4. Listar todas as tarefas");
    console.log("5. Obter uma tarefa por ID");
    console.log("6. Sair");
}

// Função para adicionar uma tarefa
function addTask() {
    rl.question('Informe o ID da tarefa: ', (id) => {
        rl.question('Informe o título da tarefa: ', (title) => {
            rl.question('Informe a descrição da tarefa: ', (description) => {
                rl.question('Informe a categoria da tarefa (opcional): ', (category) => {
                    rl.question('Informe a data de vencimento da tarefa (opcional): ', (dueDate) => {
                        if (!validateTask(title, description, category, dueDate)) {
                            console.log("Erro de validação. A tarefa não pode ser adicionada.");
                        } else {
                            const task = { id, title, description, category, dueDate, removed: false };
                            tasks.push(task);
                            console.log("Tarefa adicionada com sucesso!");
                        }
                        showMenu();
                        getUserChoice();
                    });
                });
            });
        });
    });
}

// Função para listar todas as tarefas salvas
function listAllTasks() {
    const filteredTasks = tasks.filter(task => !task.removed);
    console.log(filteredTasks);
    showMenu();
    getUserChoice();
}

// Função para obter uma tarefa através do ID
function getTaskById() {
    rl.question('Informe o ID da tarefa: ', (id) => {
        const task = tasks.find(task => task.id === id && !task.removed);

        if (task) {
            console.log(task);
        } else {
            console.log("Tarefa não encontrada.");
        }

        showMenu();
        getUserChoice();
    });
}

// Função para processar a escolha do usuário
function processUserChoice(choice) {
    switch (choice) {
        case '1':
            addTask();
            break;
        case '2':
            // Implementar a chamada para a função de editar uma tarefa
            break;
        case '3':
            // Implementar a chamada para a função de remover uma tarefa
            break;
        case '4':
            listAllTasks();
            break;
        case '5':
            getTaskById();
            break;
        case '6':
            rl.close();
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
            showMenu();
            getUserChoice();
    }
}

// Função para obter a escolha do usuário
function getUserChoice() {
    rl.question('Escolha uma opção: ', (choice) => {
        processUserChoice(choice);
    });
}

// Função de validação geral para todas as tarefas
function validateTask(title, description, category, dueDate) {
    // Implemente a validação conforme necessário
    return true; // Por enquanto, retorna true para simplificar o exemplo
}

// Exibindo o menu inicial
showMenu();
// Obtendo a escolha do usuário
getUserChoice();
