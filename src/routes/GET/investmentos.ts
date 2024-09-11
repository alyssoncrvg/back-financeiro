import { Router, Request, Response } from "express";
import { Investimentos } from "../../db/model";

const investimentosRouterGet = Router();

// Rota GET para buscar todos os investimentos
investimentosRouterGet.get('/get/investimentos', async (req: Request, res: Response) => {
    try {
        const investimentos = await Investimentos.find();
        res.status(200).json(investimentos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os investimentos", error });
    }
});

export default investimentosRouterGet;
