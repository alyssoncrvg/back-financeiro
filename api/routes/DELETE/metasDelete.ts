import { Router, Request, Response } from "express";
import { Metas } from "../../db/model"; // Certifique-se de que o caminho está correto

const metasRouterDelete = Router();

// Rota DELETE para remover uma meta por ID
metasRouterDelete.delete('/metas/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const metaRemovida = await Metas.findByIdAndDelete(id);
        if (!metaRemovida) {
            return res.status(404).json({ message: 'Meta não encontrada' });
        }
        res.status(200).json({ message: 'Meta removida com sucesso', metaRemovida });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover a meta', error });
    }
});

export default metasRouterDelete;
