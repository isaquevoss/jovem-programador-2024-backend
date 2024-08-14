function calcularAreaCirculo(raio) {
    return 3.14 * (raio * raio);
}

function calcularVolumeCilindro(raio, altura) {
    return ((raio * raio) * 3.14) * altura;
}

function calcularVolumeCilindroV2(raio, altura) {
    return calcularAreaCirculo(raio) * altura;
}
var volumeCilindro = calcularVolumeCilindro(15, 37);

console.log(volumeCilindro);

function celsiusParaFahrenheit(celsius) {
    return celsius * 1.8 + 32
}

function fahrenheitParaCelcius(fahrenheit) {
    return (fahrenheit - 32) / 1.8
}

var celsiusEmFahrenheit = celsiusParaFahrenheit(25);
console.log('25 graus celsius são ', celsiusEmFahrenheit, ' Fahrenheit')

var fahrenheitEmCelsius = fahrenheitParaCelcius(77);
console.log('77 graus Faherenheit são ', fahrenheitEmCelsius, ' celsius');

function retornaMaiorNumero(numero1, numero2, numero3) {
    var lista = [numero1, numero2, numero3]
    lista = lista.sort((a, b) => b - a )
    return lista[0]
}

var maiorNumero = retornaMaiorNumero(32,66,110)
console.log('o maior numero é ',maiorNumero)


function retonarMedia (numero1, numero2, numero3){
    return (numero1 + numero2 + numero3)/3 
}


var valorMedio = retonarMedia(32,98,54)

console.log('A média é ', valorMedio)