# Atividade - Revisão (Primeiro Bimestre)

## 📚 Questões sobre conceitos:

### 1. Quais as principais características da Linguagem JavaScript?

**R:** 
- É uma linguagem interpretada, não sendo necessário compilar o código
- É uma linguagem de tipagem dinâmica, não sendo preciso adicionar um tipo à variável
- É case-sensitive, diferenciando minúsculo de maiúsculo
- É executada tanto no navegador, quanto no servidor (backend)
- É orientada a eventos
- É uma linguagem multiparadigma, suportando programação orientada a objetos, funcional e imperativa

### 2. Quais as formas de realizar a declaração de variáveis em JavaScript e quais as suas diferenças?

**R:**
- **`var`**: escopo global ou de função
- **`let`**: escopo de bloco `{}`, mas seu valor pode ser reatribuído a qualquer momento
- **`const`**: escopo de bloco, mas seu valor não pode ser reatribuído

### 3. Quando podemos utilizar um template literal e como é a sua aplicação?

**R:** Os template literals são usados para interpolar variáveis e expressões.

**Exemplo:** 
```javascript
`Olá, ${nome}!`
```

### 4. Como funciona o Document Object Model?

**R:**
- O DOM é uma representação de todos os elementos HTML da página
- Cada tag HTML é um objeto que pode ser manipulado através do JavaScript
- Permite criar, modificar ou remover elementos de forma dinâmica

### 5. Quais os tipos de objetos presentes no DOM?

**R:**
- **`document`**: representa a página
- **`element`**: representa as tags
- **`attribute`**: atributo de tag
- **`text`**: conteúdo textual dentro das tags
- **`nodeList`**: coleção de nós

### 6. Como podemos buscar e acessar os elementos HTML na árvore do DOM e quais as diferenças entre eles?

**R:**
- **`getElementById("")`**: retorna um único elemento
- **`getElementsByClassName("")`**: retorna uma HTMLCollection
- **`querySelector("")`**: retorna o primeiro elemento que encontrar
- **`querySelectorAll("")`**: retorna todos os elementos que encontrar

### 7. Quais as diferenças entre o método addEventListener e a propriedade Eventos?

**R:**
- **Propriedade de evento**: só aceita uma função por evento, sobrescrevendo a função anterior
  ```javascript
  element.onclick = function() {}
  ```
- **addEventListener**: permite adicionar múltiplas funções para o mesmo evento
  ```javascript
  element.addEventListener("click", function() {})
  ```

### 8. Qual a importância de utilizar funções para o desenvolvimento de um código?

**R:**
- Aumenta a organização do código
- Adiciona boas práticas de reutilização de lógica
- Facilita a manutenção e legibilidade do código
- Evita repetições desnecessárias de código

### 9. Quais as diferenças entre as funções tradicionais composta pela palavra reservada "function" e a função do tipo arrow (arrow function)?

**R:**
- **Função tradicional**:
  ```javascript
  function minhaFuncao() {
    return this.valor;
  }
  ```
- **Arrow function**:
  ```javascript
  const minhaFuncao = () => {
    return valor; // não possui 'this' próprio
  }
  ```
- Arrow functions não possuem seu próprio `this`
- Arrow functions são mais concisas
- Arrow functions não podem ser usadas como construtores

### 10. Qual a diferença entre Objetos e Array em JavaScript?

**R:**
- **Objeto**: estrutura de chave: valor
  ```javascript
  let pessoa = {nome: "Fabricio", idade: 20}
  ```
- **Array**: lista ordenada de valores indexada por números
  ```javascript
  let numeros = [1, 2, 3]
  ```

### 11. Quais os principais métodos para a manipulação de Arrays em JavaScript?

**R:**
- **Ordenar**: `sort()`, `reverse()`
- **Buscar**: `find()`, `filter()`, `indexOf()`, `includes()`
- **Adicionar/Remover**: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`
- **Transformar**: `map()`, `reduce()`, `forEach()`

---

## 💻 Questões de código:
> PS: Foi feito o uso de Inteligência Artificial em alguns componentes de "atividade/style.css"

### 1. Criação dinâmica de elementos HTML
Crie um código capaz de criar elementos HTML de maneira dinâmica, por exemplo, parágrafo, listas, links e tabelas, de acordo com a escolha do usuário.

### 2. Eventos e interatividade
Crie um código no qual é possível adicionar eventos à página HTML, como clique, pressionar uma tecla, preencher os dados e apresentar o resultado em tela. Organize o código em funções.

### 3. Sistema de carrinho de compras
Crie um pequeno sistema que gerencie um carrinho de compras, permitindo ao usuário adicionar ou remover itens do carrinho. Utilize array para o desenvolvimento da questão e aplique a interatividade