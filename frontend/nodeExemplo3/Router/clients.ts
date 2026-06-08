import { Router } from "express";
import clientController from "./../Controller/ClientController"; 

const router = Router();

router.get('/', clientController.index);
router.get('/sobrenos', clientController.sobre);
router.get('/trabalheconosco', clientController.trabalheconosco);
router.get('/contato', clientController.contato);


export default router;