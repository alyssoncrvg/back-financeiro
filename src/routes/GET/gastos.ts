import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model";

const gastosRouterGet = Router();

// Rota GET para buscar todos os gastos
gastosRouterGet.get('/get/gastos', async (req: Request, res: Response) => {
    try {
        const gastos = await Gasto.find();
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar os gastos", error });
    }
});

export default gastosRouterGet;
