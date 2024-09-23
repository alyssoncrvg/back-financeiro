import { Router, Request, Response } from "express";
import { Metas } from "../../db/model";

export const metasRouterPath = Router().patch('/metas/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { icon, meta, titulo, previsao, valorGuardado } = req.body;

    try {

        const investimentoAtualizada = await Metas.findByIdAndUpdate(
            id,
            { icon, meta, titulo, previsao, valorGuardado },
            { new: true, runValidators: true }
        );

        if (!investimentoAtualizada) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }

        res.status(201).json(investimentoAtualizada)

    } catch (error){
        const err = error as Error;

        if(err.message.includes("11000") && err instanceof Error){
            return res.status(409).json({ message: "Esta meta já está cadastrado" });
        }

        res.status(500).json({ message: "Erro ao atualizar a investimento", error })
    }
})