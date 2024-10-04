const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000');
});

const { ClientesController } = require('./controllers/clientes_controller');

const clientesController = new ClientesController();
app.use('/clientes', clientesController.router);

const { ProdutosController } = require('./controllers/produtos_controller');

const produtosController = new ProdutosController();

app.use('/produtos', produtosController.router);

const { FornecedoresController } = require('./controllers/fornecedores_controller');

const fornecedoresController = new FornecedoresController();

app.use('/fornecedores', fornecedoresController.router);

const { NotasController } = require('./controllers/notas_controller');

const notasController = new NotasController();

app.use('/notas', notasController.router);