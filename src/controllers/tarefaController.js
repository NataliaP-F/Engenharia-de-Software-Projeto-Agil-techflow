let tarefas = [];
let contador = 1;

exports.listarTarefas = (req, res) => {
  res.json(tarefas);
};

exports.criarTarefa = (req, res) => {
  const { titulo } = req.body;
  const novaTarefa = { id: contador++, titulo };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

exports.atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;
  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada." });

  tarefa.titulo = titulo;
  res.json(tarefa);
};

exports.deletarTarefa = (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id != id);
  res.status(204).send();
};
