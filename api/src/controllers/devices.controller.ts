import { Request, Response } from 'express';
import { DevicesService } from '../services/devices.service';

async function listarTodos(req: Request, res: Response): Promise<void> {
  const devices = await DevicesService.listarTodos();
  res.status(200).json(devices);
}

async function criar(req: Request, res: Response): Promise<void> {
  const { model, clientId } = req.body;

  if (!model || !clientId) {
    res.status(400).json({ error: 'Modelo e clientId são obrigatórios.' });
    return;
  }

  const novoDevice = await DevicesService.criar(model, Number(clientId));
  res.status(201).json(novoDevice);
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const sucesso = await DevicesService.deletar(id);

  if (!sucesso) {
    res.status(404).json({ error: 'Dispositivo não encontrado.' });
    return;
  }

  res.status(204).send();
}

export const DevicesController = {
  listarTodos,
  criar,
  deletar,
};