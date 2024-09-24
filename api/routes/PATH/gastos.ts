import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model";

export const gastoRouterPath = Router().patch('/gastos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { novaDescricao, valor, categoria } = req.body;

    console.log(id)
    console.log(req.body)

    try{

        const gastoAtualizada = await Gasto.findByIdAndUpdate(
            id,
            { descricao: novaDescricao, valor: valor, categoria: categoria },
            { new: true, runValidators: true }
        );

        if (!gastoAtualizada) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }

        res.status(200).json(gastoAtualizada)

    } catch (error){
        const err = error as Error;

        if(err.message.includes("11000") && err instanceof Error){
            return res.status(409).json({ message: "Esse gasto já está cadastrado" });
        }

        res.status(500).json({ message: "Erro ao atualizar a carteira", error })
    }
})