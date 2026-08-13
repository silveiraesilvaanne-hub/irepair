import prisma from '../config/prismaClient';

async function listarTodos() {
  return prisma.device.findMany();
}

async function criar(model: string, clientId: number) {
  return prisma.device.create({
    data: { model, clientId },
  });
}

async function buscarPorId(id: number) {
  return prisma.device.findUnique({ where: { id } });
}

async function deletar(id: number): Promise<boolean> {
  const existente = await buscarPorId(id);

  if (!existente) {
    return false;
  }

  await prisma.device.delete({ where: { id } });
  return true;
}

export const DevicesService = {
  listarTodos,
  criar,
  buscarPorId,
  deletar,
};