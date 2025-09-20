const elementTypeSelect = document.getElementById('elementType');
const criarElementoBtn = document.getElementById('criarElemento');
const limparTudoBtn = document.getElementById('limparTudo');
const resultado = document.getElementById('resultado');

const paragrafoInputs = document.getElementById('paragrafoInputs');
const listaInputs = document.getElementById('listaInputs');
const linkInputs = document.getElementById('linkInputs');
const tabelaInputs = document.getElementById('tabelaInputs');

const paragrafoTexto = document.getElementById('paragrafoTexto');
const listaItens = document.getElementById('listaItens');
const tipoLista = document.getElementById('tipoLista');
const linkTexto = document.getElementById('linkTexto');
const linkUrl = document.getElementById('linkUrl');
const tabelaLinhas = document.getElementById('tabelaLinhas');
const tabelaColunas = document.getElementById('tabelaColunas');

function mostrarInputsCorretos() {
  paragrafoInputs.classList.remove('active');
  listaInputs.classList.remove('active');
  linkInputs.classList.remove('active');
  tabelaInputs.classList.remove('active');

  const tipoSelecionado = elementTypeSelect.value;
  switch (tipoSelecionado) {
    case 'paragrafo':
      paragrafoInputs.classList.add('active');
      break;
    case 'lista':
      listaInputs.classList.add('active');
      break;
    case 'link':
      linkInputs.classList.add('active');
      break;
    case 'tabela':
      tabelaInputs.classList.add('active');
      break;
  }
}

function criarParagrafo() {
  const texto = paragrafoTexto.value.trim();
  if (!texto) {
    alert('Por favor, digite o texto do parágrafo!');
    return;
  }

  const paragrafo = document.createElement('p');
  paragrafo.textContent = texto;
  resultado.appendChild(paragrafo);

  paragrafoTexto.value = '';
}

function criarLista() {
  const itensTexto = listaItens.value.trim();
  if (!itensTexto) {
    alert('Por favor, digite os itens da lista!');
    return;
  }

  const tipo = tipoLista.value;
  const lista = document.createElement(tipo);

  const itens = itensTexto.split(',').map(item => item.trim()).filter(item => item);

  if (itens.length === 0) {
    alert('Por favor, digite pelo menos um item válido!');
    return;
  }

  itens.forEach(itemTexto => {
    const li = document.createElement('li');
    li.textContent = itemTexto;
    lista.appendChild(li);
  });

  resultado.appendChild(lista);
  listaItens.value = '';
}

function criarLink() {
  const texto = linkTexto.value.trim();
  const url = linkUrl.value.trim();

  if (!texto || !url) {
    alert('Por favor, preencha o texto e a URL do link!');
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    alert('Por favor, insira uma URL válida (começando com http:// ou https://)!');
    return;
  }

  const link = document.createElement('a');
  link.textContent = texto;
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  resultado.appendChild(link);

  linkTexto.value = '';
  linkUrl.value = '';
}

function criarTabela() {
  const linhas = parseInt(tabelaLinhas.value);
  const colunas = parseInt(tabelaColunas.value);

  if (!linhas || !colunas || linhas < 1 || colunas < 1) {
    alert('Por favor, insira números válidos para linhas e colunas!');
    return;
  }

  if (linhas > 10 || colunas > 10) {
    alert('Máximo de 10 linhas e 10 colunas permitido!');
    return;
  }

  const tabela = document.createElement('table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  for (let j = 0; j < colunas; j++) {
    const th = document.createElement('th');
    th.textContent = `Coluna ${j + 1}`;
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  tabela.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (let i = 0; i < linhas; i++) {
    const tr = document.createElement('tr');

    for (let j = 0; j < colunas; j++) {
      const td = document.createElement('td');
      td.textContent = `Linha ${i + 1}, Col ${j + 1}`;
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  tabela.appendChild(tbody);
  resultado.appendChild(tabela);

  tabelaLinhas.value = '3';
  tabelaColunas.value = '3';
}

function criarElemento() {
  const tipoSelecionado = elementTypeSelect.value;

  switch (tipoSelecionado) {
    case 'paragrafo':
      criarParagrafo();
      break;
    case 'lista':
      criarLista();
      break;
    case 'link':
      criarLink();
      break;
    case 'tabela':
      criarTabela();
      break;
    default:
      alert('Tipo de elemento não reconhecido!');
  }
}

function limparTudo() {
  if (resultado.children.length === 0) {
    alert('Não há elementos para limpar!');
    return;
  }

  if (confirm('Tem certeza que deseja limpar todos os elementos criados?')) {
    resultado.innerHTML = '';

    paragrafoTexto.value = '';
    listaItens.value = '';
    linkTexto.value = '';
    linkUrl.value = '';
    tabelaLinhas.value = '3';
    tabelaColunas.value = '3';
  }
}

elementTypeSelect.addEventListener('change', mostrarInputsCorretos);
criarElementoBtn.addEventListener('click', criarElemento);
limparTudoBtn.addEventListener('click', limparTudo);

paragrafoTexto.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') criarElemento();
});

listaItens.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') criarElemento();
});

linkTexto.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') linkUrl.focus();
});

linkUrl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') criarElemento();
});

tabelaLinhas.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') tabelaColunas.focus();
});

tabelaColunas.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') criarElemento();
});

mostrarInputsCorretos();
