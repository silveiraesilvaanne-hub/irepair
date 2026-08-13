import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET as string;

async function register(name: string, email: string, password: string) {
  const usuarioExistente = await prisma.user.findUnique({ where: { email } });

  if (usuarioExistente) {
    throw new Error('E-mail já cadastrado.');
  }

  const senhaHasheada = await bcrypt.hash(password, 10);

  const novoUsuario = await prisma.user.create({
    data: {
      name,
      email,
      password: senhaHasheada,
    },
  });

  return {
    id: novoUsuario.id,
    name: novoUsuario.name,
    email: novoUsuario.email,
  };
}

async function login(email: string, password: string) {
  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    throw new Error('Credenciais inválidas.');
  }

  const senhaValida = await bcrypt.compare(password, usuario.password);

  if (!senhaValida) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
    },
  };
}

async function buscarPorId(id: number) {
  const usuario = await prisma.user.findUnique({ where: { id } });

  if (!usuario) {
    return null;
  }

  return {
    id: usuario.id,
    name: usuario.name,
    email: usuario.email,
  };
}

export const AuthService = {
  register,
  login,
  buscarPorId,
};