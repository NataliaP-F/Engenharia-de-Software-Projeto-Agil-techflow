const request = require('supertest');
const express = require('express');
const app = express();

// Controller da tarefa
const tarefaController = require('../src/controllers/tarefaController');

// Configuração básica do app para os testes
app.use(express.json());
app.get('/tarefas', tarefaController.listarTarefas);
app.post('/tarefas', tarefaController.criarTarefa);

describe('Testes das Tarefas', () => {
  it('Cria uma tarefa com prioridade', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Estudar para a prova', prioridade: 'Alta' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('titulo', 'Estudar para a prova');
    expect(res.body).toHaveProperty('prioridade', 'Alta');
  });

  it('Retorna erro ao criar tarefa sem título', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ titulo: '', prioridade: 'Média' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('erro');
  });

  it('Retorna erro ao criar tarefa sem prioridade', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ titulo: 'Fazer compras' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('erro');
  });
});