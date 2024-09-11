import { Router, Request, Response } from "express";
import { Carteiras } from "../../db/model"; // Certifique-se de que o caminho está correto

const carteirasRouterDelete = Router();

// Rota DELETE para remover uma carteira por ID
carteirasRouterDelete.delete('/carteiras/:banco', async (req: Request, res: Response) => {
    const { banco } = req.params;
    console.log(banco)

    try {
        const carteiraRemovida = await Carteiras.findOneAndDelete({ banco: banco });
        if (!carteiraRemovida) {
            return res.status(404).json({ message: 'Carteira não encontrada' });
        }
        res.status(200).json({ message: 'Carteira removida com sucesso', carteiraRemovida });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover a carteira', error });
    }
});

export default carteirasRouterDelete;
