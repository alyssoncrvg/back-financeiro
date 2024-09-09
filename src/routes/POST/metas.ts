import { Router, Request, Response } from "express";
import { Metas } from "../../db/model";

export const metasRouter = Router().post('/metas', async (req: Request, res:Response) => {
    const { categoria, titulo, meta, previsao, valorGuardado } = req.body

    try{

        const cadastrarMeta = new Metas({
            categoria,
            titulo,
            meta,
            previsao,
            valorGuardado,
        })

        const metaSalva = await cadastrarMeta.save()

        res.status(201).json(metaSalva)

    } catch(error) {
        res.status(404).json({ message: 'rota metas nao encontrada', error })
    }
})