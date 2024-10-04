const { Router } = require('express');  

class Controller {
    constructor(){
        this.router = Router();
        this.registrarRotas();
    }

    registrarRotas(){
        this.router.get('/', this.buscar);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.cadastrar);
        this.router.put('/:id', this.atualizar);
        this.router.delete('/:id', this.deletar);
    }
    
    async buscar(req, res){
        res.send('Buscando');
    }

    async buscarPorId(req, res){
        res.send('Buscando por id');
    }

    async cadastrar(req, res){
        res.send('Criando');
    }

    async atualizar(req, res){
        res.send('Atualizando');
    }

    async deletar(req, res){
        res.status(501).send('Método Não implementado');
    }


}

module.exports = { Controller };