import { Router, Request, Response } from "express";
import { Movimentacoes } from "../../db/model";

const movimentacoesRouterGet = Router();

movimentacoesRouterGet.get("/get/movimentacoes/:mesAno", async (req: Request, res: Response) => {
    try {
        const { mesAno } = req.params;

        // Buscar a movimentação específica
        const movimentacao = await Movimentacoes.findOne({ mesAno: mesAno });

        if (!movimentacao) {
            return res.status(404).json({ entradas: 0, saidas: 0 });
        }

        return res.status(200).json({
            entradas: movimentacao.entradas,
            saidas: movimentacao.saidas,
        });
    } catch (err) {
        console.error('Error fetching movimentacoes:', err);
        return res.status(500).json({ error: "Erro ao buscar movimentações" });
    }
});

export default movimentacoesRouterGet;
