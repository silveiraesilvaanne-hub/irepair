import type { OrdemServico } from "../types/OrdemServico";

interface ServiceCardProps {
  os: OrdemServico;
  onMudarStatus: (id: number, novoStatus: OrdemServico["status"]) => void;
}

export function ServiceCard({ os, onMudarStatus }: ServiceCardProps) {
  const corStatus =
    os.status === "aberto"
      ? "bg-green-100 text-green-700"
      : os.status === "em_andamento"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-200 text-gray-600";

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-slate-200">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-slate-800">{os.nomeCliente}</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${corStatus}`}
        >
          {os.status}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Aparelho:</span> {os.modeloAparelho}
      </p>
      <p className="text-sm text-slate-600">
        <span className="font-medium">Defeito:</span> {os.defeito}
      </p>

      <select
        value={os.status}
        onChange={(e) =>
          onMudarStatus(os.id, e.target.value as OrdemServico["status"])
        }
        className="border border-slate-300 rounded px-2 py-1 text-sm mt-2"
      >
        <option value="aberto">Aberto</option>
        <option value="em_andamento">Em Andamento</option>
        <option value="finalizado">Finalizado</option>
      </select>
    </div>
  );
}
