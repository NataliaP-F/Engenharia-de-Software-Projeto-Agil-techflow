let tarefas = [];
let contador = [];

exports.listarTarefas = (req, res) => {
  res.json(tarefas);
};

exports.criarTarefa = (req, res) => {
  const { titulo, prioridade } = req.body;

  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ erro: "O título da tarefa é obrigatório." });
  }

  if (!prioridade || !['baixa', 'media', 'alta'].includes(prioridade.toLowerCase())) {
    return res.status(400).json({ erro: "Prioridade inválida. Use: baixa, media ou alta." });
  }

  const novaTarefa = {
    id: contador++,
    titulo,
    prioridade
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

exports.atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo, prioridade } = req.body;
  const tarefa = tarefas.find(t => t.id == id);

  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada." });

  if (titulo && titulo.trim() !== '') {
    tarefa.titulo = titulo;
  }

  if (prioridade && ['baixa', 'media', 'alta'].includes(prioridade.toLowerCase())) {
    tarefa.prioridade = prioridade;
  }

  res.json(tarefa);
};

exports.deletarTarefa = (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id != id);
  res.status(204).send();
};
