const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();

app.use(cors());
app.use(bodyParser.json());

var client;

async function conectarDB(){
    client = new Client({
        user: 'postgres',
        database: 'rede_social',
        password: 'postgres',
        host: 'localhost',
    });
    await client.connect();
    client.query('select now()', (err, res) => {
        console.log(err, res.rows[0]);
    });
}

conectarDB();

app.listen(3000, () => {
    console.log('app rodando em http://localhost:3000');
});

async function cadastrarNovoUsuario(req, res){
    // validar os dados do usuário, obrigar informar, nome, email , senha e nome de usuário
    // verificar se o email e o nome de usuário já estão cadastrados
    var {nome, email, senha, nomeUsuario, telefone, bio} = req.body;
    if(!nome || !email || !nomeUsuario || !senha){
        return res.status(400).json({erro: 'Dados obrigatórios não informados'});
    }
    var usuario = await client.query('select * from usuarios where email = $1 or nome_usuario = $2',
         [email, nomeUsuario]);
    if (usuario.rows.length > 0){
        return res.status(400).json({erro: 'Usuário já cadastrado'});
    }

    var novoUsuario = await client.query (`insert into usuarios 
        (nome, email, senha, nome_usuario, telefone, bio) 
        values ($1, $2, $3, $4, $5, $6) returning *`,
    [nome, email, senha, nomeUsuario, telefone, bio]);

    res.json(novoUsuario.rows[0]);
}

app.post('/usuarios', cadastrarNovoUsuario);

