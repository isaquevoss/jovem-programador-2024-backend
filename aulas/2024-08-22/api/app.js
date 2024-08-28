const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors('*'))
app.use(bodyParser.json())

const { Client } = require('pg')
const { user } = require('pg/lib/defaults')

async function conectarPostgres() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
    })
    await client.connect()
    const res = await client.query('SELECT * from produtos');
    console.log(JSON.stringify(res.rows)) // Hello world!
}
conectarPostgres();


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000')
});

var db = {
    produtos: []
}

function buscarProdutos(query) {
    return 'select * from produtos';
}
function cadastrarProduto(produto) {
    produto.id = db.produtos.length + 1;
    db.produtos.push(produto);
    return produto;
}
function buscarProduto(id) {
    return db.produtos.find(p => p.id == id);
}
function editarProduto(id, produto) {
    var index = db.produtos.findIndex(p => p.id == id);
    db.produtos[index] = produto;
    return produto;
}

app.get('/produtos', (req, res) => {
    var produtos = buscarProdutos(req.query);
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    var produto = cadastrarProduto(req.body);
    res.json(produto);
})

app.get('/produtos/:id', (req, res) => {
    var produto = buscarProduto(req.params.id);
    res.json(produto);
})

app.put('/produtos/:id', (req, res) => {
    var produto = editarProduto(req.params.id, req.body);
    res.json(produto);
});