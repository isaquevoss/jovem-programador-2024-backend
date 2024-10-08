const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors('*'));
app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Applicação rodando em http://localhost:3000');
})

app.get('/', function (req, res) {
    res.send('Bem vindo');
})

var db = {
    clientes: [],
    produtos: [],
    usuarios: []
}

app.get('/clientes', function (req, res) {
    res.json(db.clientes);
});

app.get('/produtos', function (req, res) {
    res.json(db.produtos);
});

app.post('/clientes', function (req,res) {
    var cliente = req.body;
    cliente.id = db.clientes.length + 1;
    db.clientes.push(cliente);
    res.json(cliente);
});


app.post('/produtos', function (req,res) {
    var produto = req.body;
    produto.id = db.produtos.length + 1;
    db.produtos.push(produto);
    res.json(produto);
});

app.get('/clientes/:id', function (req, res) {
    var id = req.params.id;
    var cliente = db.clientes.find(function (cliente) {
        return cliente.id == id
    });
    res.json(cliente);
});

app.get('/produtos/:id', function (req, res) {
    var id = req.params.id;
    var produto = db.produtos.find(function (produto) {
        return produto.id == id
    });
    res.json(produto);
});