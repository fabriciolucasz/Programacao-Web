const btnMudarCor = document.getElementById('btnMudarCor');
const btnContador = document.getElementById('btnContador');
const btnToggleTexto = document.getElementById('btnToggleTexto');
const textoToggle = document.getElementById('textoToggle');
const contador = document.getElementById('contador');

const inputTexto = document.getElementById('inputTexto');
const contadorCaracteres = document.getElementById('contadorCaracteres');
const ultimaTecla = document.getElementById('ultimaTecla');
const inputNumero = document.getElementById('inputNumero');
const avisoNumero = document.getElementById('avisoNumero');

const formulario = document.getElementById('formulario');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const idade = document.getElementById('idade');
const cidade = document.getElementById('cidade');
const btnLimpar = document.getElementById('btnLimpar');

const resultados = document.getElementById('resultados');
const btnLimparResultados = document.getElementById('btnLimparResultados');

const areaInterativa = document.getElementById('areaInterativa');
const posicaoMouse = document.getElementById('posicaoMouse');
const statusMouse = document.getElementById('statusMouse');

var contadorCliques = 0;
const coresDisponiveis = ['bg-rosa', 'bg-verde', 'bg-laranja', 'bg-roxo'];
let corAtual = -1;

function adicionarResultado(texto, tipo = 'normal') {
  const item = document.createElement('div');
  item.className = `resultado-item ${tipo === 'sucesso' ? 'sucesso' : tipo === 'erro' ? 'erro-destaque' : ''}`;
  item.innerHTML = `
        <strong>${new Date().toLocaleTimeString()}</strong> - ${texto}
    `;
  resultados.appendChild(item);
  resultados.scrollTop = resultados.scrollHeight;
}

function limparErros() {
  const erros = document.querySelectorAll('.erro');
  erros.forEach(erro => erro.textContent = '');
}

function mostrarErro(campo, mensagem) {
  const erro = document.getElementById(`erro${campo}`);
  if (erro) {
    erro.textContent = mensagem;
  }
}

function mudarCorFundo() {
  corAtual = (corAtual + 1) % coresDisponiveis.length;
  const novaCorClass = coresDisponiveis[corAtual];

  document.body.classList.remove(...coresDisponiveis);

  document.body.classList.add(novaCorClass);

  adicionarResultado(`Cor de fundo alterada para: ${novaCorClass.replace('bg-', '').toUpperCase()}`, 'sucesso');
}

function incrementarContador() {
  contadorCliques++;
  contador.textContent = contadorCliques;
  btnContador.classList.add('pulse');

  setTimeout(() => {
    btnContador.classList.remove('pulse');
  }, 300);

  adicionarResultado(`Contador incrementado para: ${contadorCliques}`);
}

function toggleTexto() {
  const isHidden = textoToggle.classList.contains('hidden');

  if (isHidden) {
    textoToggle.classList.remove('hidden');
    btnToggleTexto.textContent = 'Ocultar Texto';
    adicionarResultado('Texto foi mostrado', 'sucesso');
  } else {
    textoToggle.classList.add('hidden');
    btnToggleTexto.textContent = 'Mostrar Texto';
    adicionarResultado('Texto foi ocultado');
  }
}

function atualizarContadorCaracteres() {
  const texto = inputTexto.value;
  contadorCaracteres.textContent = texto.length;

  if (texto.length > 0) {
    adicionarResultado(`Texto digitado: "${texto}" (${texto.length} caracteres)`);
  }
}

function capturarTecla(event) {
  ultimaTecla.textContent = event.key;

  if (event.key === 'Enter') {
    const texto = inputTexto.value.trim();
    if (texto) {
      adicionarResultado(`Texto confirmado com Enter: "${texto}"`, 'sucesso');
      inputTexto.value = '';
      contadorCaracteres.textContent = '0';
    }
  }
}

function validarNumero(event) {
  const char = event.key;

  if (event.ctrlKey || event.altKey ||
    ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(char)) {
    avisoNumero.classList.add('hidden');
    return;
  }

  if (!/[0-9]/.test(char)) {
    event.preventDefault();
    avisoNumero.classList.remove('hidden');

    setTimeout(() => {
      avisoNumero.classList.add('hidden');
    }, 2000);

    adicionarResultado(`Tentativa de digitar caractere inválido: "${char}"`, 'erro');
  } else {
    avisoNumero.classList.add('hidden');
  }
}

function validarFormulario(event) {
  event.preventDefault();
  limparErros();

  let isValid = true;

  if (nome.value.trim().length < 2) {
    mostrarErro('Nome', 'Nome deve ter pelo menos 2 caracteres');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    mostrarErro('Email', 'Email inválido');
    isValid = false;
  }

  const idadeValor = parseInt(idade.value);
  if (isNaN(idadeValor) || idadeValor < 1 || idadeValor > 120) {
    mostrarErro('Idade', 'Idade deve estar entre 1 e 120 anos');
    isValid = false;
  }

  if (!cidade.value) {
    mostrarErro('Cidade', 'Selecione uma cidade');
    isValid = false;
  }

  if (isValid) {
    const dados = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      idade: idadeValor,
      cidade: cidade.options[cidade.selectedIndex].text
    };

    adicionarResultado(`
            <strong>Formulário enviado com sucesso!</strong><br>
            Nome: ${dados.nome}<br>
            Email: ${dados.email}<br>
            Idade: ${dados.idade} anos<br>
            Cidade: ${dados.cidade}
        `, 'sucesso');

    formulario.reset();
  } else {
    adicionarResultado('Erro na validação do formulário. Corrija os campos destacados.', 'erro');
  }
}

function limparFormulario() {
  formulario.reset();
  limparErros();
  adicionarResultado('Formulário limpo com sucesso');
}

function atualizarPosicaoMouse(event) {
  const rect = areaInterativa.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  posicaoMouse.textContent = `x: ${x}, y: ${y}`;
}

function mouseEnter() {
  statusMouse.textContent = 'Mouse sobre a área!';
  areaInterativa.style.transform = 'scale(1.02)';
  adicionarResultado('Mouse entrou na área interativa');
}

function mouseLeave() {
  statusMouse.textContent = 'Mouse fora da área';
  areaInterativa.style.transform = 'scale(1)';
  adicionarResultado('Mouse saiu da área interativa');
}

function mouseDown() {
  statusMouse.textContent = 'Clique pressionado!';
  areaInterativa.style.opacity = '0.8';
  adicionarResultado('Botão do mouse pressionado na área');
}

function mouseUp() {
  statusMouse.textContent = 'Clique solto!';
  areaInterativa.style.opacity = '1';
  adicionarResultado('Botão do mouse solto na área');
}

function limparResultados() {
  if (resultados.children.length === 0) {
    adicionarResultado('Não há resultados para limpar!', 'erro');
    return;
  }

  if (confirm('Tem certeza que deseja limpar todos os resultados?')) {
    resultados.innerHTML = '';
    adicionarResultado('Resultados limpos com sucesso!', 'sucesso');
  }
}

btnMudarCor.addEventListener('click', mudarCorFundo);
btnContador.addEventListener('click', incrementarContador);
btnToggleTexto.addEventListener('click', toggleTexto);

inputTexto.addEventListener('input', atualizarContadorCaracteres);
inputTexto.addEventListener('keydown', capturarTecla);
inputNumero.addEventListener('keydown', validarNumero);

formulario.addEventListener('submit', validarFormulario);
btnLimpar.addEventListener('click', limparFormulario);

areaInterativa.addEventListener('mousemove', atualizarPosicaoMouse);
areaInterativa.addEventListener('mouseenter', mouseEnter);
areaInterativa.addEventListener('mouseleave', mouseLeave);
areaInterativa.addEventListener('mousedown', mouseDown);
areaInterativa.addEventListener('mouseup', mouseUp);

btnLimparResultados.addEventListener('click', limparResultados);

document.addEventListener('DOMContentLoaded', () => {
  adicionarResultado('Página carregada e eventos configurados!', 'sucesso');

  inputTexto.focus();
});
