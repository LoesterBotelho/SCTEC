import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/sobrenos', (req, res) => {
  res.send('Rota falando sobre a empresa');
});

app.get('/trabalheconosco', (req, res) => {
  res.send('opções de carreira');
});

app.get('/contato', (req, res) => {
  res.send('(48) 99999-9999');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 