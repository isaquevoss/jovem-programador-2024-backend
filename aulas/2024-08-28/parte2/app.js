const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors('*'))
app.use(bodyParser.json())

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
        password: 'postgres'//usar a senha do banco de vocês
    })
    await client.connect();
    client.query('SELECT NOW()', (err, res) => {
        console.log(res.rows[0])
    });
}

conectarPostgres();


const db ={
    produtos: []
}
async function buscarProdutos(query){
    var produtos = await client.query('select * from produtos');
    return produtos.rows;
}


function buscarProduto(id){
    return db.produtos.find(p => p.id == id);
}

function cadastrarProduto(produto){
    produto.id = db.produtos.length + 1;
    db.produtos.push(produto);
    return produto;
}

function atualizarProduto(id, produto){
    const index = db.produtos.findIndex(p => p.id == id);
    produto.id = id;
    db.produtos[index] = produto;
    return produto;
}

function deletarProduto(id){
    const index = db.produtos.findIndex(p => p.id == id);
    db.produtos.splice(index, 1);
}

app.get('/produtos',async (req, res) => {
    var produtos = await buscarProdutos(req.query);
    res.json(produtos);
});
app.get('/produtos/:id', (req, res) => {
    var produto = buscarProduto(req.params.id)
    res.json(produto);
});
app.post('/produtos', (req, res) => {
    var produto = cadastrarProduto(req.body);
    res.json(produto);
});
app.put('/produtos/:id', (req, res) => {
    var produto = atualizarProduto(req.params.id, req.body);
    res.json(produto);
});
app.delete('/produtos/:id', (req, res) => {
    deletarProduto(req.params.id);
    res.json({message: 'produto deletado com sucesso'});
})
