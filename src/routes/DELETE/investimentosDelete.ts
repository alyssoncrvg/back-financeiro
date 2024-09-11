import { Router, Request, Response } from "express";
import { Investimentos } from "../../db/model"; // Certifique-se de que o caminho está correto

const investimentosRouterDelete = Router();

// Rota DELETE para remover um investimento por ID
investimentosRouterDelete.delete('/investimentos/:bolsa', async (req: Request, res: Response) => {
    const { bolsa } = req.params;

    try {
        const investimentoRemovido = await Investimentos.findOneAndDelete({ bolsa });
        if (!investimentoRemovido) {
            return res.status(404).json({ message: 'Investimento não encontrado' });
        }
        res.status(200).json({ message: 'Investimento removido com sucesso', investimentoRemovido });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover o investimento', error });
    }
});

export default investimentosRouterDelete;
