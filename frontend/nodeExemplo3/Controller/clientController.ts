import { Request, Response } from "express";
import { IClients } from "./../Interfaces/clients"
import clientModel from "../Model/clientModel";


async function index(req: Request, res: Response, next: any) {  
  // res.render("index");
  const clients = await clientModel.findAll();
  res.json(clients);
}

async function create(req: Request, res: Response, next: any) {  
  res.render("create");
  //const clients = await clientModel.findAll();
 // res.json(clients);
}

async function store(req: Request, res: Response) {
  try {
    console.log("BODY:", req.body);

    const result = await clientModel.create(req.body);

    console.log(result.toJSON());

    res.redirect("/");
  } catch (err: any) {
    console.error("MESSAGE:", err.message);

    if (err.parent) {
      console.error("PARENT:", err.parent.message);
      console.error("DETAIL:", err.parent.detail);
    }

    res.status(500).json(err);
  }
}

function sobre(req: Request, res: Response, next: any) {
  res.send("Rota falando sobre a empresa");
}

function trabalheconosco(req: Request, res: Response, next: any) {
  res.send("opções de carreira");
}

function contato(req: Request, res: Response, next: any) {
  res.send("(48) 99999-9999");
}

export default { index, create, store, sobre, trabalheconosco, contato };
