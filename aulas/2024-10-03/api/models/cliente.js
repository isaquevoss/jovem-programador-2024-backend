export class Cliente{
    constructor(nome, email, cpf, data_nascimento){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
    }

    save(){
        console.log('Salvando cliente');
    }
    delete(){
        console.log('Deletando cliente');
    }

}