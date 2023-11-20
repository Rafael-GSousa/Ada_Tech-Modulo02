console.clear();

const prompt = require("prompt-sync")();

const tarefasCriadas = [];
const tarefasRemovidas = [];
let tarefasSalvas = [];

function menu() {
  console.log(`===== Lista de Tarefas =====

       |Menu de Opções|

  1. Criar / Adicionar tarefa
  2. Editar tarefa
  3. Remover tarefa
  4. Listar todas as tarefas ativas
  5. Obter / Exibir uma tarefa
  6. Listar todas as tarefas removidas
  7. Listar todas as tarefas (ativas e removidas)
  0. Sair
  `);

  let id = String(new Date().getTime());

  const opcao = Number(prompt("Escolha uma opção: "));

  switch (opcao) {
    case 1:
      const titulo = prompt("Digite o título da tarefa: ").trim();
      const descricao = prompt("Digite a descrição da tarefa: ").trim();
      // validacao(titulo, descricao);
      if (validacao(titulo, descricao)) {
        adicionarTarefa(id, titulo, descricao);
      } else {
        menu();
      }
      break;
    case 2:
      id = prompt("Digite o Id da tarefa que deseja editar: ").trim();
      const novoTitulo = prompt(
        "Digite o novo título da tarefa que deseja editar: "
      ).trim();
      const novaDescricao = prompt(
        "Digite a nova descrição da tarefa que deseja editar: "
      ).trim();
      editarTarefa(id, novoTitulo, novaDescricao);
      break;
    case 3:
      id = prompt("Digite o Id da tarefa que deseja remover: ").trim();
      removerTarefa(id);
      break;
    case 4:
      console.log(tarefasCriadas);
      menu();
      break;
    case 5:
      id = prompt("Digite o Id da tarefa que deseja exibir: ").trim();
      obterTarefa(id);
      break;
    case 6:
      console.log(tarefasRemovidas);
      menu();
      break;
    case 7:
      console.log(tarefasSalvas);
      menu();
      break;
    case 0:
      console.log("Encerrando o programa...");
      process.exit();
    default:
      console.clear();
      console.log(`A opção ${opcao} é inválida. Digite uma nova opção!\n`);
      menu();
  }
}

function validacao(titulo, descricao) {
  const regex = /^(?=.*[a-zA-Z])[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  try {
    if (titulo === "" || descricao === "") {
      console.log("Título ou descrição não pode estar vazio!");
      return false;
    } else if (!regex.test(titulo)) {
      console.log("O título não pode conter apenas números!");
      return false;
    } else if (titulo.length < 4) {
      console.log("O título deve ter no mínimo 4 caracteres!");
      return false;
    } else if (descricao.length < 20) {
      console.log("A descrição deve ter no mínimo 20 caracteres!");
      return false;
    } else if (tarefasCriadas.some((tarefa) => tarefa.titulo === titulo)) {
      console.log("Já existe uma tarefa com este título!");
      return false;
    }
  } catch (err) {
    console.log("Ocorreu um erro inesperado: ", err);
  }
  return true;
}

function adicionarTarefa(id, titulo, descricao) {
  tarefasCriadas.push({ id, titulo, descricao });
  tarefasSalvas.push({ id, titulo, descricao });
  console.log("Tarefa criada com sucesso!");
  menu();
}

function editarTarefa(id, novoTitulo, novaDescricao) {
  const tarefa = tarefasCriadas.find((tarefa) => tarefa.id === id);
  const tarefaSalva = tarefasSalvas.find(
    (tarefaSalva) => tarefaSalva.id === id
  );

  if (!tarefa) {
    console.log("Tarefa não encontrada!");
  } else if (validacao(novoTitulo, novaDescricao)) {
    tarefa.titulo = novoTitulo;
    tarefaSalva.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
    tarefaSalva.descricao = novaDescricao;
    console.log("Tarefa alterada com sucesso!");
  }
    menu();
}

function removerTarefa(id) {
  const index = tarefasCriadas.findIndex((tarefa) => tarefa.id === id);

  if (index !== -1) {
    const [tarefaRemovida] = tarefasCriadas.splice(index, 1);
    tarefasRemovidas.push(tarefaRemovida);
    console.log("Tarefa removida com sucesso!");
  } else {
    console.log("Tarefa não encontrada!");
  }

  menu();
}

function obterTarefa(id) {
  const tarefaObtidaAtiva = tarefasCriadas.find((tarefa) => tarefa.id === id);
  const tarefaObtidaRemovida = tarefasRemovidas.find(
    (tarefa) => tarefa.id === id
  );
  if (tarefaObtidaAtiva) {
    console.log(tarefaObtidaAtiva);
  } else if (tarefaObtidaRemovida) {
    console.log(tarefaObtidaRemovida);
  } else {
    console.log("Tarefa não encontrada!");
  }
  menu();
}

menu();
