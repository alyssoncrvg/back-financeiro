import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model";

const gastosRouter = Router();

gastosRouter.post('/gastos', async (req: Request, res: Response) => {
    const { descricao, valor, categoria } = req.body;

    try {
        const gastoExistente = await Gasto.findOneAndUpdate(
            { descricao }, 
            {
                $inc: { valor: valor },
                categoria
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!gastoExistente.date) {
            gastoExistente.date = new Date();
            await gastoExistente.save();
        }

        res.status(200).json(gastoExistente);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao criar ou atualizar registro de gasto', error });
    }
});

export default gastosRouter;
