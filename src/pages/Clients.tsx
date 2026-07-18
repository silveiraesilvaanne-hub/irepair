import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Client, NewClient } from '../types/Client';

export const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      const response = await api.get<Client[]>('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (name.trim() === '' || phone.trim() === '' || email.trim() === '') {
      alert('Preencha todos os campos.');
      return;
    }

    const newClient: NewClient = { name, phone, email };

    try {
      await api.post('/clients', newClient);
      setName('');
      setPhone('');
      setEmail('');
      fetchClients();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      alert('Não foi possível cadastrar o cliente.');
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error('Erro ao remover cliente:', error);
      alert('Não foi possível remover o cliente.');
    }
  }

  if (loading) {
    return <p className="text-slate-600">Carregando clientes...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 border border-slate-200">
        <h2 className="font-semibold text-slate-800">Novo Cliente</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />

        <button
          onClick={handleSave}
          className="bg-slate-900 text-white rounded px-4 py-2 text-sm font-medium hover:bg-slate-800"
        >
          Salvar
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center border border-slate-200"
          >
            <div>
              <p className="font-semibold text-slate-800">{client.name}</p>
              <p className="text-sm text-slate-600">{client.phone} · {client.email}</p>
            </div>
            <button
              onClick={() => handleDelete(client.id)}
              className="text-red-600 text-sm font-medium hover:text-red-800"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};