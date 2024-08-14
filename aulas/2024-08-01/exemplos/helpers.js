function formatarCpf(cpf) {
    var cpfFormatado = '';
    cpfFormatado = cpf.substring(0,3) + '.' + 
    cpf.substring(3, 6) + '.' + cpf.substring(6, 9) 
    + '-' + cpf.substring(9, 11);
    return cpfFormatado;
}

function listarCarros(carros){
    for(var i = 0; i < carros.length; i++){
        console.log(carros[i])
    }
}

formatarCpf('12345678900');

var cars = ['Toyota','Honda','VW', 'Chevrolet']
listarCarros(cars);