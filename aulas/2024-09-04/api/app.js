const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors('*'))
app.use(bodyParser.json())

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('app rodando em http://localhost:3000')
});

const { Client } = require('pg');

var client;

async function conectarPostgres(){
    client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres'//usar a senha do banco de vocês JovemP*2023
    })
    await client.connect();
    client.query('SELECT NOW()', (err, res) => {
        console.log(res.rows[0])
    });
}

conectarPostgres();


async function buscarProdutos(query){
    if (query.nome){
    var produtos = await client.query(`select * from produtos where upper(nome) like $1`,
        ['%'+ query.nome.toUpperCase() +'%' ]);
    }else{
        var produtos = await client.query('select * from produtos');
    }

    return produtos.rows;
    //no postman http://localhost:3000/produtos?nome=coca
}

async function buscarProduto(id){
    var retorno = await client.query('select * from produtos where id = $1' , [id]);
    return retorno.rows[0];
    
}

function validarRequestPostPut(req, res){
    if(!req.body.nome || !req.body.preco){
        return false;
    }
    return true;
}

async function cadastrarProduto(produto){
    var retorno = await client.query('insert into produtos (nome, preco) values ($1,$2) returning id;', 
        [produto.nome, produto.preco]);
    var produto = await buscarProduto(retorno.rows[0].id);
    return produto;
}

async function atualizarProduto(id, produto){
    await client.query('update produtos set '+
        'nome = $1, '+
        'preco = $2 '+
        'where id = $3;', [produto.nome, produto.preco, id]);
    var produto = await buscarProduto(id);
    return produto;    
}

async function deletarProduto(id){
    await client.query('delete from produtos where id = $1'[id]);
}

app.get('/produtos',async (req, res) => {
    var produtos = await buscarProdutos(req.query);
    res.json(produtos);
});
app.get('/produtos/:id', async (req, res) => {
    if (!await validarProdutoExiste(req,res)){
        return res.status(404).json({message: 'produto não encontrado'});
    }
    var produto = await buscarProduto(req.params.id)
    res.json(produto);
});
app.post('/produtos', async (req, res) => {
   if (validarRequestPostPut(req, res)){
    return res.status(400).json({message: 'nome e preco são obrigatórios'});
   }
    var produto = await cadastrarProduto(req.body);
    res.json(produto);
});
app.put('/produtos/:id', async (req, res) => {
    if (!validarRequestPostPut(req, res)){
        return res.status(400).json({message: 'nome e preco são obrigatórios'});
    }
    if (!await validarProdutoExiste(req,res)){
        return res.status(404).json({message: 'produto não encontrado'});
    }
    produto = await atualizarProduto(req.params.id, req.body);
    res.json(produto);
});
app.delete('/produtos/:id', async (req, res) => {
    if (!await validarProdutoExiste(req,res)){
        return res.status(404).json({message: 'produto não encontrado'});
    }
    await deletarProduto(req.params.id);
    res.json({message: 'produto deletado com sucesso'});
})

async function validarProdutoExiste(req, res){
    var produto = await client.query('select id from produtos where id = $1', [req.params.id]);
    console.log(produto.rows.length)
    if (produto.rows.length > 0){
        return true
    } else {
        return false;
    }
}