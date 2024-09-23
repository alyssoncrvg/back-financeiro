import { Router, Request, Response } from "express";
import { Movimentacoes } from "../../db/model";

const movimentacoesRouterGetAll = Router();

movimentacoesRouterGetAll.get("/get/movimentacoes", async (req: Request, res: Response) => {
    try {
         // Obter todos os valores distintos do campo mesAno
         const mesAnoDistinct = await Movimentacoes.distinct('mesAno');

         if (mesAnoDistinct.length === 0) {
             return res.status(404).json({ message: "Nenhum valor de mesAno encontrado" });
         }
 
         return res.status(200).json(mesAnoDistinct);
    } catch (err) {
        console.error('Error fetching movimentacoes:', err);
        return res.status(500).json({ error: "Erro ao buscar movimentações" });
    }
});

export default movimentacoesRouterGetAll;
