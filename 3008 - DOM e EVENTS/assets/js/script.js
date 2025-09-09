// eventos: propriedade e addvEventList

// eventos (mouse)

// eventos (teclado)

// atividades (DOM - interatividade na página)

// Inicializa o valor em 0
let valor = 0;

let valorElement = document.getElementById('valor');
let caractersElement = document.getElementById('caracters');
let nomeInput = document.getElementById('nome');
let resultCaracters = document.getElementById('result_caracters');
let adicionarListaBtn = document.getElementById('adicionarLista');
let resetBtn = document.getElementById('reset');

function atualizarValor(novoValor) {
  if (novoValor >= 0) {
    valor = novoValor;
    valorElement.textContent = valor;
  }
}

document.getElementById('incrementar').addEventListener('click', () => {
  atualizarValor(valor + 1);
});

document.getElementById('decrementar').addEventListener('click', () => {
  if (valor === 0) {
    alert("O número não pode ser decrementado");
  } else {
    atualizarValor(valor - 1);
  }
});

nomeInput.addEventListener('input', () => {
  const nomeSemEspacos = nomeInput.value.replace(/\s/g, '');
  caractersElement.textContent = `${nomeSemEspacos.length} caracteres`;
});

nomeInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const nome = nomeInput.value;
    const nomeSemEspacos = nome.replace(/\s/g, '');
    if (nomeSemEspacos) {
      const itemTexto = `${nome} (${nomeSemEspacos.length} caracteres)`;
      const li = document.createElement('li');
      li.textContent = itemTexto;
      resultCaracters.appendChild(li);
      nomeInput.value = ''
      caractersElement.textContent = '0 caracteres';
    }
  }
});

adicionarListaBtn.addEventListener('click', () => {
  const tipoLista = document.getElementById('tipoLista');
  const isOrdered = tipoLista.value === 'ordenada';
  const lista = document.createElement(isOrdered ? 'ol' : 'ul');
  const itens = ['Item 1', 'Item 2', 'Item 3'];
  itens.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    lista.appendChild(li);
  });
  document.body.appendChild(lista);
});

resetBtn.addEventListener('click', () => {
  valor = 0;
  valorElement.textContent = valor;
  nomeInput.value = '';
  caractersElement.textContent = '0 caracteres';
  resultCaracters.textContent = '';
  const listas = document.querySelectorAll('ul');
  listas.forEach(lista => lista.remove());
});