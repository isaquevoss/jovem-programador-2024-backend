async function outraFuncaoAssicrona(){
    return 'Resultado da funçao';
    
}

async function funcaoAssicrona() {
    return await outraFuncaoAssicrona(); // exemplo consultar banco
}
async function start(){
    var resultado = await funcaoAssicrona();
    console.log(resultado);
}

start();