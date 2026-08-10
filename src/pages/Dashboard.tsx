import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { ServiceOrder } from '../types/ServiceOrder';

export const Dashboard = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServiceOrders() {
      try {
        const response = await api.get<ServiceOrder[]>('/service-orders');
        setServiceOrders(response.data);
      } catch (error) {
        console.error('Erro ao buscar ordens de serviço:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServiceOrders();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Carregando ordens de serviço...</p>;
  }

  const open = serviceOrders.filter((so) => so.status === 'open');
  const inProgress = serviceOrders.filter((so) => so.status === 'in_progress');
  const done = serviceOrders.filter((so) => so.status === 'done');

  function renderColumn(title: string, items: ServiceOrder[]) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-slate-700">{title}</h2>
        {items.map((so) => (
          <div key={so.id} className="bg-white rounded-lg shadow p-4 border border-slate-200">
            <p className="font-semibold text-slate-800">{so.issue}</p>
            <p className="text-sm text-slate-600">{so.status}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {renderColumn('Aberto', open)}
      {renderColumn('Em Andamento', inProgress)}
      {renderColumn('Finalizado', done)}
    </div>
  );
};