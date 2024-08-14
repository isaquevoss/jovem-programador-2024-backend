const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const clientes =[];

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.post('/clientes', (req, res) => {
    const cliente = req.body;
    clientes.push(cliente);
    res.json(cliente);
});