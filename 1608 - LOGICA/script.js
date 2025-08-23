// Escreva um código para encontrar a soma da série 1 + 11 + 111 + ... n termos. Conforme a entrada a seguir:
// Exemplo da saida:
// Se o usuário digitar a quantidade de termos igual a 5, o resltado será:
// 1 + 11 + 111 + 1111 + 11111
// A soma é : 12.345

let soma = 0;
let termo = '';
let termos = [];

const quantidadeTermos = parseInt(window.prompt("Digite a quantidade de termos:"));

for (let i = 1; i <= quantidadeTermos; i++) {
  termo += '1';
  termos.push(termo);
  soma += parseInt(termo);
}

console.log(termos.join(' + '));
console.log(`A soma é: ${soma}`);

// --

// let soma10 = 0;
// let termo10 = 1;

// const quantidadeTermos10 = parseInt(window.prompt("Digite a quantidade de termos:"));

// for (let i = 1; i <= quantidadeTermos10; i++) {
//   soma10 += termo10;
//   termo10 = termo10 * 10 + 1;
// }

// console.log(`A soma é: ${soma10}`);
