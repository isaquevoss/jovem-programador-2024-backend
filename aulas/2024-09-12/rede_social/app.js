const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minha-chave-secreta'

const app = express();

app.use(cors());
app.use(bodyParser.json());

var client;

async function conectarDB() {
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


app.use(express.static('public'));

async function cadastrarNovoUsuario(req, res) {
    // validar os dados do usuário, obrigar informar, nome, email , senha e nome de usuário
    // verificar se o email e o nome de usuário já estão cadastrados
    var { nome, email, senha, nomeUsuario, telefone, bio } = req.body;
    if (!nome || !email || !nomeUsuario || !senha) {
        return res.status(400).json({ erro: 'Dados obrigatórios não informados' });
    }
    var usuario = await client.query('select * from usuarios where email = $1 or nome_usuario = $2',
        [email, nomeUsuario]);
    if (usuario.rows.length > 0) {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
    }
    var novoUsuario = await client.query(`insert into usuarios 
        (nome, email, senha, nome_usuario, telefone, bio) 
        values ($1, $2, $3, $4, $5, $6) returning *`,
        [nome, email, senha, nomeUsuario, telefone, bio]);

    res.json(novoUsuario.rows[0]);
}

app.post('/usuarios', cadastrarNovoUsuario);

async function login(req, res) {
    var { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email ou senha não informados' });
    }
    var usuario = await client.query('select * from usuarios where email = $1', [email]);
    if (usuario.rows.length == 0) {
        return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
    }
    if (usuario.rows[0].senha != senha) {
        return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
    }
    res.json({
        mensagem: 'Usuário logado com sucesso',
        token: jwt.sign({
            usuario: usuario.rows[0],
            horarioDoToken: new Date()
        }, SECRET_KEY, { expiresIn: 3600 })
    })
}
app.post('/login', login);

async function verificarToken(req, res, next) {
    if (req.headers.authorization) {
        try {
            jwt.verify(req.headers.authorization, SECRET_KEY)
            next();
        } catch (error) {
            console.log(error.message)
            res.status(401).json({ mensagem: 'Token inválido' });
        }
    } else {
        res.status(401).json({ mensagem: 'Usuário não está logado' });
    }
}
app.use(verificarToken);
//acessar a rota http://localhost:3000/publicacoes 
//com o token no header Authorization


async function buscarPublicacoes(req, res) {
    const usuario = jwt.decode(req.headers.authorization).usuario;
    var publicacoes = await client.query(`select usuarios.*, usuario_posts.* 
        from usuario_posts
        join usuario_amigos on usuario_amigos.amigo_usuario_id = usuario_posts.usuario_id
        join usuarios on usuarios.id = usuario_amigos.amigo_usuario_id
        where usuario_amigos.usuario_id = $1 or usuario_posts.usuario_id = $1`, [usuario.id]);
    res.json(publicacoes.rows);
}

app.get('/publicacoes', buscarPublicacoes);

async function criarPublicacao(req, res) {
    const usuario = jwt.decode(req.headers.authorization).usuario;
    var publicacao = req.body;
    if (!publicacao.legenda && !publicacao.media-url) {
        res.status(400).json(
            {erro: 'Legenda ou imagem da publicação não informada'}
        );
    }
    var novaPublicao = await client.query(`insert into usuario_posts 
        (usuario_id, legenda, media_url) 
        values ($1, $2, $3) returning *`, 
        [usuario.id, publicacao.legenda,publicacao.media_url]);

    res.json(novaPublicao.rows[0]);
}
app.post('/publicacoes', criarPublicacao);

async function adicionarAmigos(req, res){
    const usuario = jwt.decode(req.headers.authorization).usuario;
    console.log(req.body)
    var amigoId = req.body.amigo_id;
    if(!amigoId){
        return res.status(400).json({erro: 'Id do amigo não informado'});
    }
    await client.query('insert into usuario_amigos (usuario_id, amigo_usuario_id) values ($1, $2)', [usuario.id, amigoId]);
    await client.query('insert into usuario_amigos (usuario_id, amigo_usuario_id) values ($1, $2)', [amigoId, usuario.id]);
    res.json({
        mensagem: 'Amigo adicionado com sucesso'
    });
}

async function buscarUsuariosNaoAmigos(req,res){
    const usuario = jwt.decode(req.headers.authorization).usuario;
    var usuariosNaoAmigos = await client.query(`select usuarios.* from usuarios 
where usuarios.id != $1 and not exists (
	select amigo_usuario_id from usuario_amigos 
	where usuario_id = $1
	  and amigo_usuario_id = usuarios.id
)`, [usuario.id]);
    res.json(usuariosNaoAmigos.rows);

}

app.post('/amigos', adicionarAmigos);
app.get('/usuarios-nao-amigos', buscarUsuariosNaoAmigos);