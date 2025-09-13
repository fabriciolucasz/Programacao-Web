// Function
function verificarIdade(idade) {
  if (idade >= 18) {
    return true;
  } else {
    return false;
  }
}

// Arrow Function
const verificarIdade2 = idade => idade >= 18;

// Exemplo de Objetos (POO)
const carro = {
  marca: 'Ford',
  modelo: "Fusion",
  ano: 2009
}

// Exemplo de Programa Orientado a Objetos (POO)
class Carro {
  constructor(marca, modelo, ano) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
  }

  detalhes() {
    return `${this.marca} ${this.modelo} - ${this.ano}`;
  }
}

const meuCarro = new Carro('BMW', 'M2', 2025);
console.log(meuCarro.detalhes());

// Herança
class CarroEletrico extends Carro {
  constructor(marca, modelo, ano, autonomia) {
    super(marca, modelo, ano); // Chama o construtor da classe pai
    this.autonomia = autonomia; // Novo atributo específico de CarroEletrico
  }

  // Sobrescrevendo o método detalhes
  detalhes() {
    return `${super.detalhes()} - Autonomia: ${this.autonomia} km`;
  }
}

const meuCarroEletrico = new CarroEletrico('Tesla', 'Model S', 2022, 600);
console.log(meuCarroEletrico.detalhes());