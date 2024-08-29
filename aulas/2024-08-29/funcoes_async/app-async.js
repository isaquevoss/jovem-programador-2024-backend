async function enviarEmailClientesInadimplentes(){
    var date = new Date();
    var i = 0;
    while(i < 500){
        console.log('Enviando email para o cliente Inadimplente', i++);
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('o processo demorou', new Date() - date, 'ms');
}

async function enviarEmailPromocoes(){
    var date = new Date();
    var i = 0;
    while (i < 500){
        console.log('Enviando email para o cliente com promoções', i++);
        await new Promise(resolve => setTimeout(resolve, 5));   
    }
    console.log('o processo demorou', new Date() - date, 'ms');
}

async function start() {
    await enviarEmailClientesInadimplentes();
    await enviarEmailPromocoes();
}
start();