import { Request, Response } from 'express';
import { ServiceOrdersService } from '../services/serviceOrders.service';

async function listarTodos(req: Request, res: Response): Promise<void> {
  const ordens = await ServiceOrdersService.listarTodos();
  res.status(200).json(ordens);
}

async function criar(req: Request, res: Response): Promise<void> {
  const { issue, clientId, deviceId } = req.body;

  if (!issue || !clientId || !deviceId) {
    res.status(400).json({ error: 'issue, clientId e deviceId são obrigatórios.' });
    return;
  }

  const novaOrdem = await ServiceOrdersService.criar(
    issue,
    Number(clientId),
    Number(deviceId)
  );
  res.status(201).json(novaOrdem);
}

async function atualizarStatus(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const { status } = req.body;

  const ordemAtualizada = await ServiceOrdersService.atualizarStatus(id, status);

  if (!ordemAtualizada) {
    res.status(404).json({ error: 'Ordem de serviço não encontrada.' });
    return;
  }

  res.status(200).json(ordemAtualizada);
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const sucesso = await ServiceOrdersService.deletar(id);

  if (!sucesso) {
    res.status(404).json({ error: 'Ordem de serviço não encontrada.' });
    return;
  }

  res.status(204).send();
}

export const ServiceOrdersController = {
  listarTodos,
  criar,
  atualizarStatus,
  deletar,
};