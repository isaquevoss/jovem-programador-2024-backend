function enviarEmailClientesInadimplentes(){
    var i = 0;
    while(i < 500){
        console.log('Enviando email para o cliente Inadimplente', i++);
    }
}

function enviarEmailPromocoes(){
    var i = 0;
    while (i < 500){
        console.log('Enviando email para o cliente com promoções', i++);   
    }
}

function start() {
    enviarEmailClientesInadimplentes();
    enviarEmailPromocoes();
}
start();