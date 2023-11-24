## Extra 1

Adicionar a lógica de categoria nas tarefas, com isso as funcionalidades e campos mudam para:

TESTE OK <Adicionar uma tarefa (id, titulo, descrição e categoria)>
TESTE OK <Editar uma tarefa salva (titulo, descrição e categoria)>
TESTE OK <Listar tarefas de uma categoria em especifico>
TESTE OK <Categoria é um campo opcional>

### Todas a validações anteriores +
TESTE OK <Categoria deve ter no mínimo 5 caracteres>

## Extra 2

Adicionar a lógica de vencimento nas tarefas, com isso as funcionalidades e campos mudam para:

TESTE OK <Adicionar uma tarefa (id, titulo, descrição, categoria e vencimento)>
TESTE OK <Editar uma tarefa salva (titulo, descrição, categoria e vencimento)>
TESTE OK <Listar tarefas com um campo booleano (vencido) para mostrar se a tarefa está ou não vencida>
TESTE OK <Listar tarefas vencidas>
TESTE OK <Listar tarefas não vencidas>

### Todas a validações anteriores +
TESTE OK <Campo vencimento não pode ser menor que a data de hoje (momento do cadastro/edição)>

## Extra 3

Adicionar totalizadores (uma função que retorna as seguintes informações)

TESTE OK <Quantidade de tarefas na aplicação>
TESTE OK <Quantidade de tarefas sem categoria>
TESTE OK <Quantidade de tarefas por categoria>
TESTE OK <Quantidade de tarefas sem vencimento>
TESTE OK <Quantidade de tarefas vencidas>
TESTE OK <Quantidade de tarefas no prazo>

## Extra 4

Adicionar lógica `soft delete` com isso as funcionalidades e campos mudam para:

TESTE OK <Adicionar uma tarefa (id, titulo, descrição, categoria, vencimento, removido[Essa parte não tem lógica, tendo em vista que se você está adicionando não está removendo])>
TESTE OK <Listar tarefas removidas>
TESTE OK <Recuperar tarefa removida>

### Todas a validações anteriores +
TESTE OK <Campo removido deve ser padrão `false`, ao remover uma tarefa esse campo é alterado, assim não sendo mais listado apenas na funcionalidade especifica de listagem de tarefas removidas>


> Boa sorte!!! =D
