import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model";

const gastosRouter = Router()

gastosRouter.post('/gastos', async (req: Request, res: Response) => {
    const { descricao, valor, categoria } = req.body;
    const date = new Date;
    try{
        const novoGasto =  new Gasto({
            descricao,
            valor,
            categoria,
            date
        })

        const gastoSalvo = await novoGasto.save();
        res.status(201).json(gastoSalvo)

    } catch (error){
        res.status(404).json({ message: 'erro ao criar registro', error })
    }
})

export default gastosRouter;