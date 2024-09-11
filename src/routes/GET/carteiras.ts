import { Router, Request, Response } from "express";
import { Carteiras } from "../../db/model";

const carteirasRouterGet = Router();

// Rota GET para buscar todas as carteiras
carteirasRouterGet.get('/get/carteiras', async (req: Request, res: Response) => {
    try {
        const carteiras = await Carteiras.find();
        res.status(200).json(carteiras);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as carteiras", error });
    }
});

export default carteirasRouterGet;
