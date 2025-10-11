const express = require('express');
const app = express();
const PORT = 1337;

app.use(express.static('public'));
app.use(express.static(__dirname + '/../'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/contato', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).send('Nome e email são obrigatórios.');
  }

  res.send(`Dados recebidos: ${nome}, ${email}`);
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(PORT, () => {
  console.log(`Estou rodando em: http://localhost:${PORT}`);
});