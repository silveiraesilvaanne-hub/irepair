import prisma from '../config/prismaClient';

async function listarTodos() {
  return prisma.serviceOrder.findMany();
}

async function criar(issue: string, clientId: number, deviceId: number) {
  return prisma.serviceOrder.create({
    data: { issue, clientId, deviceId },
  });
}

async function buscarPorId(id: number) {
  return prisma.serviceOrder.findUnique({ where: { id } });
}

async function atualizarStatus(id: number, status: string) {
  const existente = await buscarPorId(id);

  if (!existente) {
    return undefined;
  }

  return prisma.serviceOrder.update({
    where: { id },
    data: { status },
  });
}

async function deletar(id: number): Promise<boolean> {
  const existente = await buscarPorId(id);

  if (!existente) {
    return false;
  }

  await prisma.serviceOrder.delete({ where: { id } });
  return true;
}

export const ServiceOrdersService = {
  listarTodos,
  criar,
  atualizarStatus,
  deletar,
};