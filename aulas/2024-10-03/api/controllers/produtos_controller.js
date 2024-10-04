const { Controller } = require('./controller');

class ProdutosController extends Controller {

    async buscar(req, res){
        res.send('Buscando produtos');
    }

    async buscarPorId(req, res){
        res.send('Buscando produto por id');
    }

    async cadastrar(req, res){
        res.send('Criando produto');
    }

    async atualizar(req, res){
        res.send('Atualizando produto');
    }

    async deletar(req, res){
        res.send('Deletando produto');
    }

}

module.exports = { ProdutosController };