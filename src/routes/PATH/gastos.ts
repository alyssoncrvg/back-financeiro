import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model";

export const gastoRouterPath = Router().patch('/gastos/:descricao', async (req: Request, res: Response) => {
    const { descricao } = req.params;
    const { novaDescricao, valor, categoria } = req.body;

    console.log(descricao)

    try{

        const gastoAtualizada = await Gasto.findOneAndUpdate(
            { descricao },
            { descricao: novaDescricao, valor, categoria },
            { new: true, runValidators: true }
        );

        if (!gastoAtualizada) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }

        res.status(201).json(gastoAtualizada)

    } catch (error){
        const err = error as Error;

        if(err.message.includes("11000") && err instanceof Error){
            return res.status(409).json({ message: "Esse gasto já está cadastrado" });
        }

        res.status(500).json({ message: "Erro ao atualizar a carteira", error })
    }
})