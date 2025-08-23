const getUser = document.querySelector('.user span');

if (getUser) {
  const userName = localStorage.getItem('user');

  setTimeout(() => {
    localStorage.setItem('user', 'Fabricio');
    getUser.textContent = 'Bem vindo(a), ' + userName;
  }, 10000);
}

let variavel1 = document.getElementById("simple_text");
if (variavel1) {
  variavel1.textContent = "Clique aqui para ver um alerta!";
  variavel1.addEventListener("click", function () {
    alert("Você clicou no alerta!");
  });
}

let variavel2 = document.getElementsByClassName("triade");
for (let i = 0; i < variavel2.length; i++) {
  variavel2[i].textContent = `Clique aqui para ver um ${variavel2[i].textContent}!`;
}

let variavel3 = document.getElementsByTagName("p");
// console.log(variavel3[4].textContent);

const createDestinyDiv = document.getElementById('create_element');
let ul = document.createElement('ul');
let itens = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

for (let i = 0; i < itens.length; i++) {
  let li = document.createElement('li');
  li.textContent = itens[i];
  ul.appendChild(li);
}

createDestinyDiv.appendChild(ul);

const getAlgorithm = document.getElementById('algorithm');
const input1 = document.createElement('input');
const input2 = document.createElement('input');
const resultDisplay = document.createElement('h3');
const processSelect = document.createElement('select');
const executeButton = document.createElement('button');

input1.placeholder = "Valor 1";
input2.placeholder = "Valor 2";
executeButton.textContent = "Executar";

input1.addEventListener('keypress', function (event) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
});

input2.addEventListener('keypress', function (event) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
});

const operations = ['+', '-', '*', '/'];
operations.forEach(op => {
  const option = document.createElement('option');
  option.value = op;
  option.textContent = op;
  processSelect.appendChild(option);
});

getAlgorithm.appendChild(input1);
getAlgorithm.appendChild(input2);
getAlgorithm.appendChild(processSelect);
getAlgorithm.appendChild(executeButton);
getAlgorithm.appendChild(resultDisplay);

executeButton.addEventListener('click', function () {
  const value1 = parseFloat(input1.value);
  const value2 = parseFloat(input2.value);
  const operation = processSelect.value;
  let result;

  switch (operation) {
    case '+':
      result = value1 + value2;
      break;
    case '-':
      result = value1 - value2;
      break;
    case '*':
      result = value1 * value2;
      break;
    case '/':
      result = value2 !== 0 ? value1 / value2 : 'Erro: Divisão por zero';
      break;
  }

  resultDisplay.textContent = `Resultado da operação: ${result}`;
});

const clickButton = document.getElementById('click_button');
if (clickButton) {
  clickButton.ondblclick = function () {
    alert('Por quê você clicou no botão!?');
    clickButton.textContent = 'Você clicou sim!';
  };
}
