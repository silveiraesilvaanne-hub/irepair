import prisma from '../config/prismaClient';

async function listarTodos() {
  return prisma.client.findMany();
}

async function criar(name: string, phone: string, email: string) {
  return prisma.client.create({
    data: { name, phone, email },
  });
}

async function buscarPorId(id: number) {
  return prisma.client.findUnique({ where: { id } });
}

async function deletar(id: number): Promise<boolean> {
  const existente = await buscarPorId(id);

  if (!existente) {
    return false;
  }

  await prisma.client.delete({ where: { id } });
  return true;
}

export const ClientsService = {
  listarTodos,
  criar,
  buscarPorId,
  deletar,
};