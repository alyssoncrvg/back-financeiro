import { Router, Request, Response } from "express";
import { Investimentos } from "../../db/model";

const investimentoRouter = Router()

investimentoRouter.post('/investimentos', async (req: Request, res: Response) => {
    const { bolsa, valor } = req.body;
    const date = new Date;
    try{
        const novoInvestimento = new Investimentos({
            bolsa,
            valor,
            date
        })

        await novoInvestimento.save()
        res.status(201).json(novoInvestimento)


    } catch (error){
        res.status(404).json({ message: 'nao encontrado rota de investimentos', error })
    }
})

export default investimentoRouter;