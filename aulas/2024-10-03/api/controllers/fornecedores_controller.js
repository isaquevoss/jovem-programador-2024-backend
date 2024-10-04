const { Controller } = require('./controller');
class FornecedoresController extends Controller {
  
    async buscar(req, res){
        res.send('Buscando fornecedores');
    }
  
    async buscarPorId(req, res){
        res.send('Buscando fornecedor por id');
    }
  
    async cadastrar(req, res){
        res.send('Criando fornecedor');
    }
  
    async atualizar(req, res){
        res.send('Atualizando fornecedor');
    }
  
    async deletar(req, res){
        res.send('Deletando fornecedor');
    }
}

module.exports = { FornecedoresController };