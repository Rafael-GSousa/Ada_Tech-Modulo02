console.clear();
const prompt = require("prompt-sync")();
const tasks = [];

// Menu principal
function mainMenu() {
  while (true) {
    console.log("\n===== Lista de Tarefas (ToDo List)=====\n");
    console.log(`
    |Menu Principal|

1. Criar Tarefa
2. Editar Tarefa
3. Remover Tarefa
4. Recuperar Tarefa Removida
5. Consultar Tarefa
6. Consultar uma categoria
7. Menu de Exibição de Tarefas
9. Sair
`);

    const choice = prompt("Escolha uma opção: ");
    try {
      switch (choice) {
        case "1":
          console.log("\n===== Criar uma tarefa =====\n");
          createTask(getUserInput());
          break;
        case "2":
          console.log("\n===== Editar uma tarefa =====\n");
          editTask(getUserInput(choice));
          break;
        case "3":
          console.log("\n===== Remover uma tarefa =====\n");
          removeTask(getUserInput(choice));
          break;
        case "4":
          console.log("\n===== Recuperar uma tarefa removida =====\n");
          recoverTask(getUserInput(choice));
          break;
        case "5":
          console.log("\n===== Exibir uma tarefa =====\n");
          getTask(getUserInput(choice));
          break;
        case "6":
          console.log("\n===== Exibir uma categoria =====\n");
          getCategory(getUserInput(choice));
          break;
        case "7":
          listMenu();
          break;
        case "9":
          console.log("Encerrando o programa...");
          process.exit();
        default:
          console.log("Opção inválida!. Tente novamente!\n");
      }
    } catch (err) {
      console.error("Erro inesperado: ", err.message);
    }
  }
}

// Obter as entradas do usuário
function getUserInput(choice) {
  let id = Number(new Date().getTime());
  if (choice === "2") {
    id = Number(prompt("ID da tarefa que deseja editar: "));
  }
  if (choice === "3") {
    id = Number(prompt("ID da tarefa que deseja remover: "));
    return id;
  }
  if (choice === "4") {
    id = Number(prompt("ID da tarefa que deseja recuperar: "));
    return id;
  }
  if (choice === "5") {
    id = Number(prompt("ID da tarefa que deseja consultar: "));
    return id;
  }
  if (choice === "6") {
    const categoryForSearch = prompt("Categoria que deseja consultar: ");
    return categoryForSearch;
  }

  const title = prompt("Título: ").trim();
  const description = prompt("Descrição: ").trim();
  const category = prompt("Categoria (opcional): ").trim();
  const day = prompt("Dia de vencimento (2 dígitos) : ").trim();
  const month = prompt("Mês de vencimento (2 dígitos) : ").trim();
  const year = prompt("Ano de vencimento (4 dígitos) : ").trim();
  const [hour, minute] = prompt("Horário de vencimento (no formato HH:MM) : ")
    .trim()
    .split(":");

  if (day && month && year) {
    const dueDate = new Date(
      Number(year),
      Number(month - 1),
      Number(day),
      Number(hour),
      Number(minute)
    );
    return [id, title, description, category, dueDate];
  }

  return [id, title, description, category];
}

// Validar as entradas do usuário
function validateUserInput(title, description, category, dueDate) {
  const currentDate = new Date();
  const futureDate = new Date(dueDate);
  const duplicateTitle = tasks.some(
    (task) => task.titulo.toLowerCase() === title.toLowerCase()
  );

  try {
    if (
      !title ||
      !description ||
      title.length < 4 ||
      duplicateTitle ||
      !isNaN(title) ||
      description.length < 20 ||
      (category && category.length < 5) ||
      (futureDate && futureDate < currentDate)
    ) {
      throw new Error(`Entrada inválida!
      Instruções: 
      1. Título e descrição são obrigatórios;
      2. Título deve ter, no mínimo, 4 caracteres;
      3. Título não pode consistir apenas em números;
      4. Título não pode ser o mesmo de uma tarefa já criada;
      5. Descrição deve ter, no mínimo, 20 caracteres;
      6. Categoria, caso exista, deve ter, no mínimo, 5 caracteres;
      7. Data de vencimento não pode ser inferior à data atual.`);
    }

    return true;
  } catch (err) {
    console.error("Erro inesperado: ", err.message);

    return false;
  }
}

// Criar uma tarefa
function createTask([
  id,
  title,
  description,
  category = "",
  dueDate = "Sem Vencimento",
]) {
  try {
    if (!validateUserInput(title, description, category, dueDate)) {
      throw new Error(
        "Erro ao criar a tarefa. Verifique os dados e tente novamente."
      );
    } else {
      tasks.push({
        id: id,
        titulo: title,
        descricao: description,
        categoria: category,
        vencimento: dueDate,
        vencida: false,
        removida: false,
      });

      console.log("\nTarefa criada com sucesso!\n");
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Validar o vencimento de uma tarefa
function validateDueTask() {
  const currentDate = new Date();
  tasks.forEach((task) => {
    const taskWithDueDate = task.vencimento;
    if (taskWithDueDate instanceof Date) {
      task.vencida = taskWithDueDate <= currentDate;
    }
  });
}

// Editar uma tarefa
function editTask([
  id,
  title,
  description,
  category = "",
  dueDate = "Sem Vencimento",
]) {
  try {
    const taskForEdit = tasks.find((task) => task.id === id);

    if (!taskForEdit) {
      throw new Error(
        "Tarefa não localizada! Certifique-se de que o Id esteja correto."
      );
    } else if (!validateUserInput(title, description, category, dueDate)) {
      throw new Error("Erro ao editar tarefa! Verifique os campos digitados.");
    } else {
      taskForEdit.titulo = title;
      taskForEdit.descricao = description;
      taskForEdit.categoria = category;
      taskForEdit.vencimento = dueDate;
      console.log("\nTarefa editada com sucesso!\n");
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Remover uma tarefa
function removeTask(id) {
  try {
    const taskForRemove = tasks.find(
      (task) => task.id === id && task.removida === false
    );

    if (!taskForRemove) {
      throw new Error(
        "Tarefa não localizada! Verifique se o Id está corresponde a uma tarefa ativa."
      );
    } else {
      taskForRemove.removida = true;
      console.log("\nTarefa removida com sucesso!\n");
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Recuperar uma tarefa removida
function recoverTask(id) {
  try {
    const taskForRecover = tasks.find(
      (task) => task.id === id && task.removida === true
    );

    if (!taskForRecover) {
      throw new Error(
        "Tarefa não localizada! Verifique se o Id corresponde a uma tarefa removida."
      );
    } else {
      taskForRecover.removida = false;
      console.log("\nTarefa recuperada com sucesso!\n");
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Obter uma tarefa pelo Id
function getTask(id) {
  try {
    const findTask = tasks.find((task) => task.id === id);

    if (findTask) {
      console.log("\nTarefa encontrada!\n");
      console.log(formatTaskForDisplay(findTask));
    } else {
      throw new Error("Tarefa não encontrada! Verifque o Id digitado.");
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Obter uma categoria
function getCategory(category) {
  try {
    const filterCategory = tasks.filter(
      (task) => task.categoria.toLowerCase() === category.toLowerCase()
    );

    if (filterCategory) {
      console.log("\nCategoria encontrada!\n");
      console.log(filterCategory);
    } else {
      throw new Error(
        "Categoria não encontrada! Verifque a Categoria digitada."
      );
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Menu de exibição
function listMenu() {
  while (true) {
    console.log("\n===== Lista de Tarefas (ToDo List)=====\n");
    console.log(`
  |Menu de Exibição|

1. Todas as tarefas
2. Tarefas vencidas
3. Tarefas dentro do prazo
4. Tarefas removidas
5. Tarefas ativas
6. Exibir totais
9. Voltar ao menu principal
`);

    const choice = prompt("Escolha uma opção: ");
    try {
      switch (choice) {
        case "1":
          console.log("\n===== Todas as tarefas =====\n");
          listTasks(choice);
          break;
        case "2":
          console.log("\n===== Tarefas vencidas =====\n");
          listTasks(choice);
          break;
        case "3":
          console.log("\n===== Tarefas dentro do prazo =====\n");
          listTasks(choice);
          break;
        case "4":
          console.log("\n===== Tarefas removidas =====\n");
          listTasks(choice);
          break;
        case "5":
          console.log("\n===== Tarefas ativas =====\n");
          listTasks(choice);
          break;
        case "6":
          console.log("\n===== Totais =====\n");
          listTasksTotals();
          break;
        case "9":
          mainMenu();
        default:
          console.log("Opção inválida!. Tente novamente!\n");
      }
    } catch (err) {
      console.error("Erro inesperado: ", err.message);
    }
  }
}

// Listar tarefas
function listTasks(choice) {
  try {
    const allTasks = tasks.filter((task) => task.id); // todas as tarefas
    const overdueTask = tasks.filter((task) => task.vencida); // tarefas vencidas
    const unoverdueTask = tasks.filter((task) => !task.vencida); // tarefas dentro do prazo
    const removedTask = tasks.filter((task) => task.removida); // tarefas removidas
    const activeTask = tasks.filter((task) => !task.removida); // tarefas não removidas (ativas)

    validateDueTask();

    switch (choice) {
      case "1":
        if (!allTasks.length) {
          throw new Error("Não existem tarefas cadastradas no sistema");
        } else {
          allTasks.forEach((task) => {
            console.log(formatTaskForDisplay(task));
          });
        }
        break;
      case "2":
        if (!overdueTask.length) {
          throw new Error("Não existem tarefas vencidas no sistema");
        } else {
          overdueTask.forEach((task) => {
            console.log(formatTaskForDisplay(task));
          });
        }
        break;
      case "3":
        if (!unoverdueTask.length) {
          throw new Error("Não existem tarefas dentro do prazo no sistema");
        } else {
          unoverdueTask.forEach((task) => {
            console.log(formatTaskForDisplay(task));
          });
        }
        break;
      case "4":
        if (!removedTask.length) {
          throw new Error("Não existem tarefas removidas do sistema");
        } else {
          removedTask.forEach((task) => {
            console.log(formatTaskForDisplay(task));
          });
        }
        break;
      case "5":
        if (!activeTask.length) {
          throw new Error("Não existem tarefas ativas no sistema");
        } else {
          activeTask.forEach((task) => {
            console.log(formatTaskForDisplay(task));
          });
        }
        break;
    }
  } catch (err) {
    console.error("Erro inesperado: ", err.message);
  }
}

// Função para formatar a tarefa para exibição
function formatTaskForDisplay(task) {
  // Clonar a tarefa para não modificar o objeto original
  const formattedTask = { ...task };

  // Formatar a data de vencimento no formato pt-BR
  if (formattedTask.vencimento instanceof Date) {
    formattedTask.vencimento = formattedTask.vencimento.toLocaleString("pt-BR");
  }

  return formattedTask;
}

// exibindo os totais
function listTasksTotals() {
  const totalTasks = tasks.length; // Quantidade de tarefas na aplicação
  const totalTasksWithoutCategory = tasks.filter(
    (task) => task.categoria === ""
  ).length; // Quantidade de tarefas sem categoria
  // * Quantidade de tarefas por categoria
  // * ===================================
  const categoryCounts = {};
  tasks.forEach((task) => {
    if (task.categoria) {
      categoryCounts[task.categoria] =
        (categoryCounts[task.categoria] || 0) + 1;
    }
  });
  // * ===================================
  const totalTasksWithoutDueDate = tasks.filter(
    (task) => task.vencimento === "Sem Vencimento"
  ).length; //Quantidade de tarefas sem vencimento
  const totalOverdueTasks = tasks.filter(
    (task) => task.vencida === true
  ).length; // Quantidade de tarefas vencidas
  const totalUnoverdueTasks = tasks.filter(
    (task) => task.vencida === false
  ).length; // Quantidade de tarefas no prazo

  console.log(`Tarefas na Aplicação: ${totalTasks}`);
  console.log(`Tarefas Sem Categoria: ${totalTasksWithoutCategory}`);
  console.log(`\nTarefas por Categoria:`);
  for (const [category, count] of Object.entries(categoryCounts)) {
    console.log(`${category}: ${count}`);
  }
  console.log(`Tarefas Sem Vencimento: ${totalTasksWithoutDueDate}`);
  console.log(`Tarefas Vencidas: ${totalOverdueTasks}`);
  console.log(`Tarefas no prazo: ${totalUnoverdueTasks}`);
}

mainMenu();
