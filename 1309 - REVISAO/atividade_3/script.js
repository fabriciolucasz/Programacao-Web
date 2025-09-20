var produtos = [
  { id: 1, nome: "Smartphone Samsung", preco: 899.99, categoria: "Eletrônicos" },
  { id: 2, nome: "Notebook Dell", preco: 2499.99, categoria: "Eletrônicos" },
  { id: 3, nome: "Camiseta Nike", preco: 89.90, categoria: "Roupas" },
  { id: 4, nome: "Tênis Adidas", preco: 299.90, categoria: "Calçados" },
  { id: 5, nome: "Livro JavaScript", preco: 45.50, categoria: "Livros" },
  { id: 6, nome: "Mouse Gamer", preco: 159.90, categoria: "Eletrônicos" },
  { id: 7, nome: "Jeans Levi's", preco: 199.90, categoria: "Roupas" },
  { id: 8, nome: "Fone Bluetooth", preco: 199.99, categoria: "Eletrônicos" }
];

var carrinho = [];
let proximoId = 9;

const nomeProdutoInput = document.getElementById('nomeProduto');
const precoProdutoInput = document.getElementById('precoProduto');
const categoriaProdutoInput = document.getElementById('categoriaProduto');
const btnAdicionarProduto = document.getElementById('btnAdicionarProduto');

const buscarProdutoInput = document.getElementById('buscarProduto');
const filtroCategoriaSelect = document.getElementById('filtroCategoria');
const ordenarPorSelect = document.getElementById('ordenarPor');

const listaProdutos = document.getElementById('listaProdutos');
const listaCarrinho = document.getElementById('listaCarrinho');
const carrinhoVazio = document.getElementById('carrinhoVazio');

const totalItensSpan = document.getElementById('totalItens');
const totalValorSpan = document.getElementById('totalValor');
const subtotalSpan = document.getElementById('subtotal');
const freteSpan = document.getElementById('frete');
const totalFinalSpan = document.getElementById('totalFinal');

const btnLimparCarrinho = document.getElementById('btnLimparCarrinho');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');

const modalCompra = document.getElementById('modalCompra');
const resumoCompra = document.getElementById('resumoCompra');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnNovaCompra = document.getElementById('btnNovaCompra');

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calcularFrete(total) {
  if (total === 0) return 0;
  if (total >= 200) return 0;
  if (total >= 100) return 15;
  return 25;
}

function obterCategorias() {
  const categorias = [...new Set(produtos.map(produto => produto.categoria))];
  return categorias.sort();
}

function buscarProdutoPorId(id) {
  return produtos.find(produto => produto.id === id);
}

function buscarItemCarrinho(produtoId) {
  return carrinho.find(item => item.produtoId === produtoId);
}

function adicionarNovoProduto() {
  const nome = nomeProdutoInput.value.trim();
  const preco = parseFloat(precoProdutoInput.value);
  const categoria = categoriaProdutoInput.value.trim();

  if (!nome || !preco || !categoria) {
    alert('Por favor, preencha todos os campos do produto!');
    return;
  }

  if (preco <= 0) {
    alert('O preço deve ser maior que zero!');
    return;
  }

  const novoProduto = {
    id: proximoId++,
    nome: nome,
    preco: preco,
    categoria: categoria
  };

  produtos.push(novoProduto);

  nomeProdutoInput.value = '';
  precoProdutoInput.value = '';
  categoriaProdutoInput.value = '';

  atualizarFiltroCategoria();
  renderizarProdutos();

  const produtoCard = document.querySelector(`[data-produto-id="${novoProduto.id}"]`);
  if (produtoCard) {
    produtoCard.classList.add('pulse');
    setTimeout(() => produtoCard.classList.remove('pulse'), 300);
  }
}

function removerProduto(id) {
  if (confirm('Tem certeza que deseja remover este produto?')) {
    produtos = produtos.filter(produto => produto.id !== id);

    carrinho = carrinho.filter(item => item.produtoId !== id);

    renderizarProdutos();
    renderizarCarrinho();
    atualizarTotais();
    atualizarFiltroCategoria();
  }
}

function filtrarProdutos() {
  const termoBusca = buscarProdutoInput.value.toLowerCase();
  const categoriaFiltro = filtroCategoriaSelect.value;
  const ordenacao = ordenarPorSelect.value;

  let produtosFiltrados = produtos.filter(produto => {
    const nomeMatch = produto.nome.toLowerCase().includes(termoBusca);
    const categoriaMatch = !categoriaFiltro || produto.categoria === categoriaFiltro;
    return nomeMatch && categoriaMatch;
  });

  switch (ordenacao) {
    case 'nome':
      produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case 'preco-menor':
      produtosFiltrados.sort((a, b) => a.preco - b.preco);
      break;
    case 'preco-maior':
      produtosFiltrados.sort((a, b) => b.preco - a.preco);
      break;
    case 'categoria':
      produtosFiltrados.sort((a, b) => a.categoria.localeCompare(b.categoria));
      break;
  }

  renderizarProdutosFiltrados(produtosFiltrados);
}

function renderizarProdutos() {
  filtrarProdutos();
}

function renderizarProdutosFiltrados(produtosList) {
  listaProdutos.innerHTML = '';

  if (produtosList.length === 0) {
    listaProdutos.innerHTML = '<p style="text-align: center; color: #636e72; font-size: 1.1rem;">Nenhum produto encontrado.</p>';
    return;
  }

  produtosList.forEach(produto => {
    const produtoCard = document.createElement('div');
    produtoCard.className = 'produto-card slide-in';
    produtoCard.setAttribute('data-produto-id', produto.id);

    let itemCarrinho = buscarItemCarrinho(produto.id);
    const quantidadeNoCarrinho = itemCarrinho ? itemCarrinho.quantidade : 0;

    produtoCard.innerHTML = `
            <div class="produto-nome">${produto.nome}</div>
            <div class="produto-preco">R$ ${formatarMoeda(produto.preco)}</div>
            <div class="produto-categoria">${produto.categoria}</div>
            <div class="produto-actions">
                <button onclick="adicionarAoCarrinho(${produto.id})" class="btn btn-success btn-small">
                    Adicionar ${quantidadeNoCarrinho > 0 ? `(${quantidadeNoCarrinho})` : ''}
                </button>
                <button onclick="removerProduto(${produto.id})" class="btn btn-danger btn-small">
                    Remover
                </button>
            </div>
        `;

    listaProdutos.appendChild(produtoCard);
  });
}

function atualizarFiltroCategoria() {
  const categoriaAtual = filtroCategoriaSelect.value;
  filtroCategoriaSelect.innerHTML = '<option value="">Todas as categorias</option>';

  const categorias = obterCategorias();
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    if (categoria === categoriaAtual) {
      option.selected = true;
    }
    filtroCategoriaSelect.appendChild(option);
  });
}

function adicionarAoCarrinho(produtoId) {
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) return;

  let itemExistente = buscarItemCarrinho(produtoId);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      produtoId: produtoId,
      quantidade: 1
    });
  }

  renderizarCarrinho();
  renderizarProdutos();
  atualizarTotais();

  const badge = document.querySelector('.badge');
  badge.classList.add('pulse');
  setTimeout(() => badge.classList.remove('pulse'), 300);
}

function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter(item => item.produtoId !== produtoId);
  renderizarCarrinho();
  renderizarProdutos();
  atualizarTotais();
}

function alterarQuantidade(produtoId, novaQuantidade) {
  if (novaQuantidade <= 0) {
    removerDoCarrinho(produtoId);
    return;
  }

  const item = buscarItemCarrinho(produtoId);
  if (item) {
    item.quantidade = novaQuantidade;
    renderizarCarrinho();
    renderizarProdutos();
    atualizarTotais();
  }
}

function renderizarCarrinho() {
  if (carrinho.length === 0) {
    carrinhoVazio.classList.remove('hidden');
    listaCarrinho.innerHTML = '';
    return;
  }

  carrinhoVazio.classList.add('hidden');
  listaCarrinho.innerHTML = '';

  carrinho.forEach(item => {
    const produto = buscarProdutoPorId(item.produtoId);
    if (!produto) return;

    const carrinhoItem = document.createElement('div');
    carrinhoItem.className = 'carrinho-item slide-in';

    carrinhoItem.innerHTML = `
            <div class="item-info">
                <div class="item-nome">${produto.nome}</div>
                <div class="item-preco">R$ ${formatarMoeda(produto.preco)} x ${item.quantidade}</div>
                <div style="color: #00b894; font-weight: bold; font-size: 1.1rem;">
                    Total: R$ ${formatarMoeda(produto.preco * item.quantidade)}
                </div>
            </div>
            <div class="item-actions">
                <div class="quantidade-controls">
                    <button onclick="alterarQuantidade(${produto.id}, ${item.quantidade - 1})">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${produto.id}, ${item.quantidade + 1})">+</button>
                </div>
                <button onclick="removerDoCarrinho(${produto.id})" class="btn btn-danger btn-small">
                    🗑️ Remover
                </button>
            </div>
        `;

    listaCarrinho.appendChild(carrinhoItem);
  });
}

function limparCarrinho() {
  if (carrinho.length === 0) {
    alert('O carrinho já está vazio!');
    return;
  }

  if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
    carrinho = [];
    renderizarCarrinho();
    renderizarProdutos();
    atualizarTotais();
  }
}

function atualizarTotais() {
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const subtotal = carrinho.reduce((total, item) => {
    const produto = buscarProdutoPorId(item.produtoId);
    return total + (produto ? produto.preco * item.quantidade : 0);
  }, 0);

  const frete = calcularFrete(subtotal);
  const totalFinal = subtotal + frete;

  totalItensSpan.textContent = totalItens;
  totalValorSpan.textContent = formatarMoeda(totalFinal);
  subtotalSpan.textContent = formatarMoeda(subtotal);
  freteSpan.textContent = formatarMoeda(frete);
  totalFinalSpan.textContent = formatarMoeda(totalFinal);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Adicione itens ao carrinho antes de finalizar a compra!');
    return;
  }

  const subtotal = carrinho.reduce((total, item) => {
    const produto = buscarProdutoPorId(item.produtoId);
    return total + (produto ? produto.preco * item.quantidade : 0);
  }, 0);

  const frete = calcularFrete(subtotal);
  const totalFinal = subtotal + frete;
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  const resumoHTML = `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #2d3436; margin-bottom: 15px;">Resumo da Compra</h3>
            <p><strong>Total de itens:</strong> ${totalItens}</p>
            <p><strong>Subtotal:</strong> R$ ${formatarMoeda(subtotal)}</p>
            <p><strong>Frete:</strong> R$ ${formatarMoeda(frete)} ${frete === 0 ? '(GRÁTIS!)' : ''}</p>
            <div style="border-top: 2px solid #667eea; padding-top: 10px; margin-top: 10px;">
                <p style="font-size: 1.2rem;"><strong>Total Final: R$ ${formatarMoeda(totalFinal)}</strong></p>
            </div>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px;">
            <h4 style="color: #2d3436; margin-bottom: 15px;">Itens Comprados:</h4>
            ${carrinho.map(item => {
    const produto = buscarProdutoPorId(item.produtoId);
    return produto ? `
                    <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 5px;">
                        <strong>${produto.nome}</strong><br>
                        Quantidade: ${item.quantidade} x R$ ${formatarMoeda(produto.preco)} = 
                        <span style="color: #00b894;">R$ ${formatarMoeda(produto.preco * item.quantidade)}</span>
                    </div>
                ` : '';
  }).join('')}
        </div>
    `;

  resumoCompra.innerHTML = resumoHTML;
  modalCompra.classList.remove('hidden');
}

function fecharModal() {
  modalCompra.classList.add('hidden');
}

function novaCompra() {
  carrinho = [];
  renderizarCarrinho();
  renderizarProdutos();
  atualizarTotais();
  fecharModal();
}

btnAdicionarProduto.addEventListener('click', adicionarNovoProduto);
btnLimparCarrinho.addEventListener('click', limparCarrinho);
btnFinalizarCompra.addEventListener('click', finalizarCompra);
btnFecharModal.addEventListener('click', fecharModal);
btnNovaCompra.addEventListener('click', novaCompra);

buscarProdutoInput.addEventListener('input', filtrarProdutos);
filtroCategoriaSelect.addEventListener('change', filtrarProdutos);
ordenarPorSelect.addEventListener('change', filtrarProdutos);

nomeProdutoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') precoProdutoInput.focus();
});

precoProdutoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') categoriaProdutoInput.focus();
});

categoriaProdutoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') adicionarNovoProduto();
});

modalCompra.addEventListener('click', (e) => {
  if (e.target === modalCompra) {
    fecharModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  atualizarFiltroCategoria();
  renderizarProdutos();
  renderizarCarrinho();
  atualizarTotais();

  nomeProdutoInput.focus();
});
