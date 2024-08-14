//no terminal
//npm install express body-parser cors

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors('*'));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('app está rodando http://localhost:3000');
})

// id, usuario_id, conversa_id, mensagem, data_criacao
var mensagens = [
    { mensagem: 'Mensagem teste 1', usuario: 'Isaque' },
    { mensagem: 'Mensagem teste 2', usuario: 'João'},
];

app.get('/mensagens', (req, res) => {
    res.json(mensagens);
})

app.post('/mensagens', (req, res) => {
    var mensagem = req.body;
    mensagens.push(mensagem);
    res.json(mensagem)
});


//node app.js e acesse localhost:3000/mensagens