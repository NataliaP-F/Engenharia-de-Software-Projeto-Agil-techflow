const express = require('express');
const cors = require('cors');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/tarefas', tarefaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
