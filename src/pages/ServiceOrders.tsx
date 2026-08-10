import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { ServiceOrder } from '../types/ServiceOrder';
import type { Client } from '../types/Client';
import type { Device } from '../types/Device';

export const ServiceOrders = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientId, setClientId] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [issue, setIssue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [ordersResponse, clientsResponse, devicesResponse] = await Promise.all([
        api.get<ServiceOrder[]>('/service-orders'),
        api.get<Client[]>('/clients'),
        api.get<Device[]>('/devices'),
      ]);
      setServiceOrders(ordersResponse.data);
      setClients(clientsResponse.data);
      setDevices(devicesResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (clientId === '' || deviceModel.trim() === '' || issue.trim() === '') {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const deviceResponse = await api.post<Device>('/devices', {
        model: deviceModel,
        clientId: Number(clientId),
      });

      await api.post('/service-orders', {
        issue,
        clientId: Number(clientId),
        deviceId: deviceResponse.data.id,
      });

      setClientId('');
      setDeviceModel('');
      setIssue('');
      fetchData();
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      alert('Não foi possível registrar a ordem de serviço.');
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/service-orders/${id}`);
      fetchData();
    } catch (error) {
      console.error('Erro ao remover ordem de serviço:', error);
      alert('Não foi possível remover a ordem de serviço.');
    }
  }

  function findClientName(id: number) {
    const client = clients.find((c) => c.id === id);
    return client ? client.name : 'Cliente não encontrado';
  }

  function findDeviceModel(id: number) {
    const device = devices.find((d) => d.id === id);
    return device ? device.model : 'Dispositivo não encontrado';
  }

  if (loading) {
    return <p className="text-slate-600">Carregando ordens de serviço...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 border border-slate-200">
        <h2 className="font-semibold text-slate-800">Nova Ordem de Serviço</h2>

        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Modelo do aparelho"
          value={deviceModel}
          onChange={(e) => setDeviceModel(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Defeito"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
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
        {serviceOrders.map((so) => (
          <div
            key={so.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center border border-slate-200"
          >
            <div>
              <p className="font-semibold text-slate-800">{findClientName(so.clientId)}</p>
              <p className="text-sm text-slate-600">
                {findDeviceModel(so.deviceId)} · {so.issue}
              </p>
              <span className="text-xs text-slate-500">{so.status}</span>
            </div>
            <button
              onClick={() => handleDelete(so.id)}
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