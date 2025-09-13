Atividade - Revisão (Primeiro Bimestre)
### Questões sobre conceitos:
1. Quais as principais características da Linguagem JavaScript?
R: Ela é uma linguagem interpretada, não sendo necessário compilar o código;
Ela é uma linguagem de tipagem dinâmica, não sendo preciso adicionar um atributo à variável;
Ela é case-sensitive, diferenciando minusculo de maiusculo;
Ela é executada tanto no navegador, quanto no servidor (backend);
Ela é orientada a eventos;
Ela é uma linguagem multiparadigma, suportando programação orientada a objetos, funcional e imperativa;

2. Quais as formas de realizar a declaração de variáveis em JavaScript e quais as suas diferenças?
R: var: é um escopo global ou de função;
let: é um escopo de bloco {}, mas seu valor pode ser reatribuido a qualquer momento;
const: também é um escopo de bloco, mas seu valor não pode ser reatribuido;

3. Quando podemos utilizar um template literal e como é a sua aplicação?
R: Os templates literals são usados para interpolar varíaveis e expressões, exemplo: `Olá, ${nome}`

4. Como funciona o Document Object Model?
R: O DOM é uma representação de todos os elementos HTML da página;
Cada tag HTML é um objeto que pode ser manipulado através do JavaScript;
Permite criar, modificar ou remover elementos de forma dinâmica;

5. Quais os tipos de objetos presentes no DOM?
R: document: representa a página;
element: representa as tags;
attribute: atributo de tag;
text: conteúdo textual dentro das tags;
nodeList: coleção de nós;

6. Como podemos buscar e acessar os elementos HTML na árvore do DOM e quais as diferenças entre eles?
R: getElementById(""): retorna um único elemento;
getElementByClassName(""): retorna uma collection (HTMLCollection);
querySelector(""): retorna o primeiro que encontrar;
querySelectorAll(""): retorna todos que encontrar;

7. Quais as diferenças entre o método AddEventListener e a propriedade Eventos?
R: Uma propriedade de evento só aceita uma função por evento, sobrescrevendo assim a função anterior `element.onclick = function() {}`;
Um AddEventListener permite adicionar múltiplas funções para o mesmo evento `element.AddEventListener("click", function() {})`;

8. Qual a importância de utilizar funções para o desenvolvimento de um código?
R: Aumenta a organização do código;
Adicione boas práticas de reutilização de lógica;
Facilita a manutenção e legibilidade do código;
Evita repetições desnecessárias de código;

9. Quais as diferenças entre as funções tradicionais composta pela palavra reservada “function” e a função do tipo arrow (arrow function)?
R:

10. Qual a diferença entre Objetos e Array em JavaScript?
R: Um objeto é uma estrutura de chave: valor `let pessoa = {nome: "Fabricio", idade: 20}`;
Uma array é uma lista ordenada de valores e é indexada por números `let numeros [1,2,3]`;

11. Quais os principais métodos para a manipulação de Arrays em JavaScript?
R: Ordenar: sort, reverse;
Buscar: find, filter, indexOf, includes;
Adicionar/Remover: push, pop, shift, unshift, splice;
Transformar: map, reduce, forEach;

### Questões de código:
1. Crie um código capaz de criar elementos HTML de maneira dinâmica, por 
exemplo, parágrafo, listas, links e tabelas, de acordo com a escolha do usuário.
2. Crie um código no qual é possível adicionar eventos a página HTML, como clique, 
pressionar uma tecla, preencher os dados e apresentar o resultado em tela.
Organize o código em funções.
3. Crie um pequeno sistema que gerencie um carrinho de compras, permitindo o 
usuário adicionar ou remover itens do carrinho. Utilize array para o 
desenvolvimento da questão e aplique a interatividade através do DOM