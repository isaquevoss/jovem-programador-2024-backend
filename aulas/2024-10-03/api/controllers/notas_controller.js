const {Controller} = require('./controller');

class NotasController extends Controller {

    constructor(){
        super();
        this.router.post('/emitir', this.emitir);
    }
    
    async emitir(req, res){
        res.send('Emitindo nota');
    }

    async buscar(req, res){
        res.send('Buscando notas');
    }

    async buscarPorId(req, res){
        res.send('Buscando nota por id');
    }

    async cadastrar(req, res){
        res.send('Criando nota');
    }

    async atualizar(req, res){
        res.send('Atualizando nota');
    }

    async deletar(req, res){
        res.send('Deletando nota');
    }
}

module.exports = { NotasController };   