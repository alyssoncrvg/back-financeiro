import { Router, Request, Response } from "express";
import { Investimentos } from "../../db/model";

export const investimentoRouterPath = Router().patch('/investimentos/:bolsa', async (req:Request, res: Response) => {
    const { bolsa } = req.params
    const { novaBolsa, valor } = req.body;

    try{

        const investimentoAtualizada = await Investimentos.findOneAndUpdate(
            { bolsa },
            { bolsa: novaBolsa, valor },
            { new: true, runValidators: true }
        );

        if (!investimentoAtualizada) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }

        res.status(201).json(investimentoAtualizada)

    } catch (error) {
        const err = error as Error;

        if(err.message.includes("11000") && err instanceof Error){
            return res.status(409).json({ message: "Esta bolsa já está cadastrado" });
        }

        res.status(500).json({ message: "Erro ao atualizar a investimento", error })
    }
})