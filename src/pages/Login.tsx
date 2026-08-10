import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit() {
    setErro('');

    if (email.trim() === '' || password.trim() === '') {
      setErro('Preencha e-mail e senha.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setErro('E-mail ou senha inválidos.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3 border border-slate-200 w-full max-w-sm">
        <h1 className="text-xl font-bold text-slate-800">iRepair</h1>
        <p className="text-slate-500 text-sm mb-2">Entre com sua conta</p>

        {erro && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
            {erro}
          </p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={handleSubmit}
          className="bg-slate-900 text-white rounded px-4 py-2 text-sm font-medium hover:bg-slate-800"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}