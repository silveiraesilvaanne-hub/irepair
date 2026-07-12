import { useState } from "react";
import type { OrdemServico } from "../types/OrdemServico";

interface NewServiceFormProps {
  onAdicionar: (novaOs: OrdemServico) => void;
}

export function NewServiceForm({ onAdicionar }: NewServiceFormProps) {
  const [nomeCliente, setNomeCliente] = useState("");
  const [modeloAparelho, setModeloAparelho] = useState("");
  const [defeito, setDefeito] = useState("");

  function handleSalvar() {
    if (nomeCliente.trim() === "" || modeloAparelho.trim() === "") {
      alert("Preencha ao menos o nome do cliente e o modelo do aparelho.");
      return;
    }

    const novaOs: OrdemServico = {
      id: Date.now(),
      nomeCliente,
      modeloAparelho,
      defeito,
      status: "aberto",
    };

    onAdicionar(novaOs);

    setNomeCliente("");
    setModeloAparelho("");
    setDefeito("");
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 border border-slate-200">
      <h2 className="font-semibold text-slate-800">Nova Ordem de Serviço</h2>

      <input
        type="text"
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        className="border border-slate-300 rounded px-3 py-2 text-sm"
      />

      <input
        type="text"
        placeholder="Modelo do aparelho"
        value={modeloAparelho}
        onChange={(e) => setModeloAparelho(e.target.value)}
        className="border border-slate-300 rounded px-3 py-2 text-sm"
      />

      <input
        type="text"
        placeholder="Defeito relatado"
        value={defeito}
        onChange={(e) => setDefeito(e.target.value)}
        className="border border-slate-300 rounded px-3 py-2 text-sm"
      />

      <button
        onClick={handleSalvar}
        className="bg-slate-900 text-white rounded px-4 py-2 text-sm font-medium hover:bg-slate-800"
      >
        Salvar
      </button>
    </div>
  );
}
