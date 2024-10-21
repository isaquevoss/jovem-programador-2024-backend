import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Aluno } from './aluno.js';

import conexao from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(3000,async () => {
    console.log('Aplicação está rodando na porta 3000');
    await conexao.authenticate();
    await conexao.sync();
})

app.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll();
    res.json(alunos);
})

app.get('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    res.json(aluno);
});

app.post('/alunos', async (req, res) => {
    const aluno = await Aluno.create({
        nome: req.body.nome,
        matricula: req.body.matricula,
        dataNascimento: req.body.dataNascimento
    });
    res.json(aluno);
});

app.put('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    aluno.nome = req.body.nome;
    aluno.matricula = req.body.matricula;
    aluno.dataNascimento = req.body.dataNascimento;
    await aluno.save();
    res.json(aluno);
});

app.delete('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    await aluno.destroy();
    res.json(aluno);
});