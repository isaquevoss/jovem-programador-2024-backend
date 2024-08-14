var idade = 30;
console.log('sua idade é ', idade, 'anos');
var aluno = {
    nome: 'Isaque',
    idade: 30,
    profissao: 'Desenvolvedor',
    empresa: 'Google',
    endereco: {
        rua: 'Rua dos Bobos',
        numero: 0,
        bairro: 'Vila do Chaves',
        cidade: 'São Paulo',
        estado: 'SP',
        localizacao: {
            latitude: 0,
            longitude: 0
        }
    }
}

console.log('Dados do aluno');
console.log('Nome: ', aluno.nome);
console.log('JSON do aluno', JSON.stringify(aluno));

function soma(a, b){
    return a + b;
}

var resultado = soma(10, 20);
console.log('Resultado da soma: ', resultado);



function nome (parametro1, parametro2){
    //
    //
    //
    //
    return 'Seu nome';
}