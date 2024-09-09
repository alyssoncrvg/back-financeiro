import { Router, Request, Response } from "express";
import { Gasto } from "../../db/model"; // Certifique-se de que o caminho está correto

const gastosRouterDelete = Router();

// Rota DELETE para remover um gasto por ID
gastosRouterDelete.delete('/gastos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const gastoRemovido = await Gasto.findByIdAndDelete(id);
        if (!gastoRemovido) {
            return res.status(404).json({ message: 'Gasto não encontrado' });
        }
        res.status(200).json({ message: 'Gasto removido com sucesso', gastoRemovido });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover o gasto', error });
    }
});

export default gastosRouterDelete;
