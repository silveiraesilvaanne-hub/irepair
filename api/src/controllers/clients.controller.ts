import { Request, Response } from 'express';
import { ClientsService } from '../services/clients.service';

async function listarTodos(req: Request, res: Response): Promise<void> {
  const clientes = await ClientsService.listarTodos();
  res.status(200).json(clientes);
}

async function criar(req: Request, res: Response): Promise<void> {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    res.status(400).json({ error: 'Nome, telefone e e-mail são obrigatórios.' });
    return;
  }

  const novoCliente = await ClientsService.criar(name, phone, email);
  res.status(201).json(novoCliente);
}

async function deletar(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const sucesso = await ClientsService.deletar(id);

  if (!sucesso) {
    res.status(404).json({ error: 'Cliente não encontrado.' });
    return;
  }

  res.status(204).send();
}

export const ClientsController = {
  listarTodos,
  criar,
  deletar,
};