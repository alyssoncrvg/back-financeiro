import { Router, Request, Response } from "express";
import { Metas } from "../../db/model";

const metasRouterGet = Router();

// Rota GET para buscar todas as metas
metasRouterGet.get('/get/metas', async (req: Request, res: Response) => {
    try {
        const metas = await Metas.find();
        res.status(200).json(metas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar as metas", error });
    }
});

export default metasRouterGet;
