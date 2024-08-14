function soma(num1, num2){
    return num1 + num2;
}

var valor = soma(2,2)
console.log(valor)
var novoValor = soma(valor, valor);
console.log(novoValor)

for(var i = 0; i < 10; i++){
    console.log(i);
}

var carros = ['Toyota', 'Honda', 'VW', 'CHEVROLET'];

for (var i = 0; i < carros?.length; i++){
    console.log('o carro número: ',i,' é ',carros[i])
}
carros.unshift('FIAT')
console.log('----------------------')

for (var i = carros?.length - 1; i >= 0; i--){
    console.log('o carro número: ',i,' é ',carros[i])
}

