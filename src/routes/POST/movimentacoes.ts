import { Router, Request, Response } from "express";
import { Movimentacoes } from "../../db/model";

const movimentacoesRouterPost = Router();

movimentacoesRouterPost.post("/movimentacoes", async (req: Request, res: Response) => {
    try {
        const { value } = req.body;

        // Obter o mês e o ano da data atual no formato MM/YYYY
        const hoje = new Date();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // Meses em JS vão de 0 a 11
        const ano = hoje.getFullYear();
        const mesAno = `${mes}-${ano}`;

        // Tenta encontrar uma movimentação existente para o mês/ano atual
        let movimentacao = await Movimentacoes.findOne({ mesAno });

        if (movimentacao) {
            if(value > 0) movimentacao.entradas += value || 0;
            else movimentacao.saidas += (value *(-1)) || 0;
        } else {
            if(value > 0) {
                var entradas = value
                var saidas = 0
            } else{
                var saidas = value * (-1)
            }
            movimentacao = new Movimentacoes({
                mesAno,
                entradas: entradas || 0,
                saidas: saidas || 0,
            });
        }

        // Salva a movimentação (nova ou atualizada)
        await movimentacao.save();

        console.log(movimentacao)

        return res.status(201).json(movimentacao);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao registrar movimentação" });
    }
});

export default movimentacoesRouterPost