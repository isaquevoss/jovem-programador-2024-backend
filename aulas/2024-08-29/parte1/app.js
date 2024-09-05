const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();

app.use(cors('*'))
app.use(bodyParser.json())


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('app rodando em http://localhost:3000')
});


var client;

async function conectarPostgres(){
    client = new Client({
        user: 'postgres',
        host: '127.0.0.1',
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
    var produtos = await client.query('select * from produtos');
    return produtos.rows;
}

async function buscarProduto(id){
    var retorno = await client.query('select * from produtos where id =' + id);
    return retorno.rows[0];
}

async function cadastrarProduto(produto){
    var retorno = await client.query('insert into produtos (nome, preco) values (\'' 
        + produto.nome + '\' ,' + produto.preco + ') returning id;');
    var produto = buscarProduto(retorno.rows[0].id);
    return produto;
}

async function atualizarProduto(id, produto){
    var retorno = await client.query('update produtos set '+
        'nome = \'' + produto.nome + '\', ' +
        'preco = ' + produto.preco + ' where id = ' + id);
    var produto = buscarProduto(id);
    return produto;    
}

async function deletarProduto(id){
    await client.query('delete from produtos where id = ' + id);
}

app.get('/produtos',async (req, res) => {
    var produtos = await buscarProdutos(req.query);
    res.json(produtos);
});
app.get('/produtos/:id', async (req, res) => {
    var produto = await buscarProduto(req.params.id)
    res.json(produto);
});
app.post('/produtos', async (req, res) => {
    var produto = await cadastrarProduto(req.body);
    res.json(produto);
});
app.put('/produtos/:id', async (req, res) => {
    var produto = await atualizarProduto(req.params.id, req.body);
    res.json(produto);
});
app.delete('/produtos/:id', async (req, res) => {
    await deletarProduto(req.params.id);
    res.json({message: 'produto deletado com sucesso'});
})