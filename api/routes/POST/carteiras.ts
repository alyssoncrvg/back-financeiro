import { Router, Request, Response } from "express";
import { Carteiras } from "../../db/model";

const carteirasRouter = Router()

carteirasRouter.post('/carteiras', async (req: Request, res: Response) => {
    const { banco, saldo } = req.body;

    try{

        const cadastroCarteira = await Carteiras.findOneAndUpdate(
            {banco},
            { 
                $inc: { saldo: saldo }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        cadastroCarteira.save()

        res.status(200).json(cadastroCarteira)

    } catch (error){
        res.status(404).json({message: 'Rota de carteira nao encontrada', error})
    }
})

export default carteirasRouter;