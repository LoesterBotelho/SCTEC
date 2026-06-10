import express from "express";
import clientsRouter from "./Router/clients";
import db from "./db";

const app = express();
const port = process.env.PORT;

// assim ele usa apartir do /clients
// app.use('/clients', clientsRouter);

// assim ele usa apartir do /
app.use(clientsRouter);
app.set('view engine', 'pug');
app.set('views', './Views');

db.sync().then(() =>{
  console.log("Conectado com o banco de dados: " + process.env.DB_NAME);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 