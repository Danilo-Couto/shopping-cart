/* var htmlExemplo = 'SKU: MLB1937267358 | NAME: Cpu Pc Gamer Intel I5 24008gb Ssd 240gb Geforce Gt610 2gb | PRICE: $1899';
var resultado = htmlExemplo.substring(htmlExemplo.length-5);

console.log(resultado); */

var htmlExemplo = 'SKU: MLB1937267358 | NAME: Cpu Pc Gamer Intel I5 24008gb Ssd 240gb Geforce Gt610 2gb | PRICE: $1899';
var resultado = htmlExemplo.split('$').pop();

console.log(resultado);