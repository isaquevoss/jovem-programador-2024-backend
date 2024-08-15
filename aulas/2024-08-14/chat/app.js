const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors('*')); 
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/login', function (req, res) {
    res.send('página de login ou request de login');
})

app.get('/teste-json', function (req, res) {
    res.json({ mensagem: 'sucesso', data: new Date() });
});

var produtos = [
    { id: 1, nome: 'Produto 1', preco: 100 },
    { id: 2, nome: 'Produto 2', preco: 200 },
    { id: 3, nome: 'Produto 3', preco: 300 },
    { id: 4, nome: 'Bicicleta aro 29 24 velocidades', preco: 400 },
];
app.get('/produtos/:id/', function (req, res) {
    res.json(produtos.find(p => p.id == req.params.id));
});

app.get('/parametros-via-query', function (req, res) { 
    //para testar acessar http://localhost:3000/parametros-via-query?nome=teste&idade=30
    res.json(req.query);
});

app.get('/produtos', function (req, res) { 
    //para testar acessar http://localhost:3000/produtos?nome=produto 1
    res.json(produtos.filter(p => p.nome.toLowerCase().includes(req.query.nome.toLowerCase())));
})
