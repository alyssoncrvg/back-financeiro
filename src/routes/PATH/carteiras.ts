import { Router, Request, Response } from "express";
import { Carteiras } from "../../db/model";


export const carteirasRoutPath = Router().patch("/carteiras/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { novoBanco, saldo } = req.body;

    try{
        const carteiraAtualizada = await Carteiras.findByIdAndUpdate(
            id ,
            { banco: novoBanco, saldo },
            { new: true, runValidators: true }
        );

        if (!carteiraAtualizada) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }

        res.status(200).json({ message: 'Carteira atualizada com sucesso', carteiraAtualizada });
    } catch (error){

        const err = error  as Error
        if(err.message.includes("11000") && err instanceof Error){
            return res.status(409).json({ message: "Esse banco já está cadastrado" });
        }

        res.status(500).json({ message: "Erro ao atualizar a carteira", error })
    }
})