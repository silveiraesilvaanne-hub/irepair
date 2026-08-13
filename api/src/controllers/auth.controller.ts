import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    return;
  }

  try {
    const usuario = await AuthService.register(name, email, password);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    return;
  }

  try {
    const { token, user } = await AuthService.login(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
}

function logout(req: Request, res: Response): void {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout realizado com sucesso.' });
}

async function me(req: Request, res: Response): Promise<void> {
  const usuario = await AuthService.buscarPorId(req.userId!);

  if (!usuario) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
    return;
  }

  res.status(200).json(usuario);
}

export const AuthController = {
  register,
  login,
  logout,
  me,
};