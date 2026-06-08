import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/sobrenos', (req, res) => {
  res.send('Rota falando sobre a empresa');
});

router.get('/trabalheconosco', (req, res) => {
  res.send('opções de carreira');
});

router.get('/contato', (req, res) => {
  res.send('(48) 99999-9999');
});

export default router;