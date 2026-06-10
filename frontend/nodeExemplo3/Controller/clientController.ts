import { Request, Response } from "express";
import { IClients } from "./../Interfaces/clients"
import clientModel from "../Model/clientModel";


async function index(req: Request, res: Response, next: any) {  
  // res.render("index");
  const clients = await clientModel.findAll();
  res.json(clients);
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

export default { index, sobre, trabalheconosco, contato };
