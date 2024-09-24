import { Router, Request, Response } from "express";
import { Investimentos } from "../../db/model";

const investimentoRouter = Router()

investimentoRouter.post('/investimentos', async (req: Request, res: Response) => {
    const { bolsa, valor } = req.body;

    try {
        const investimentoExistente = await Investimentos.findOneAndUpdate(
            { bolsa },
            { 
                $inc: { valor: valor }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!investimentoExistente.date) {
            investimentoExistente.date = new Date();
            await investimentoExistente.save();
        }

        res.status(200).json(investimentoExistente);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao cadastrar ou atualizar investimento', error });
    }
});

export default investimentoRouter;