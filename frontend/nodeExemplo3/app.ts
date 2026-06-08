import express from "express";
import clientsRouter from "./Router/clients";

const app = express();
const port = 3000;

// assim ele usa apartir do /clients
// app.use('/clients', clientsRouter);

// assim ele usa apartir do /
app.use(clientsRouter);
app.set('view engine', 'pug');
app.set('views', './Views');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 