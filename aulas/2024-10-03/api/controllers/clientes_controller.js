const { Controller } = require('./controller');
class ClientesController extends Controller{

    async buscar(req, res){
        res.send('Buscando clientes');
    }

    async buscarPorId(req, res){
        res.send('Buscando cliente por id');
    }

    async cadastrar(req, res){
        res.send('Criando cliente');
    }

    async atualizar(req, res){
        res.send('Atualizando cliente');
    }
    async deletar(req, res){
        res.send('Deletando cliente');
    }
}

module.exports = { ClientesController };