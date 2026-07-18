import { useState } from "react";
import { Header } from "./components/Header";
import { ServiceCard } from "./components/ServiceCard";
import { NewServiceForm } from "./components/NewServiceForm";
import type { OrdemServico } from "./types/OrdemServico";

function App() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);

  function adicionarOrdem(novaOs: OrdemServico) {
    setOrdens((ordensAtuais) => [...ordensAtuais, novaOs]);
  }

  function mudarStatus(id: number, novoStatus: OrdemServico["status"]) {
    setOrdens((ordensAtuais) =>
      ordensAtuais.map((os) =>
        os.id === id ? { ...os, status: novoStatus } : os,
      ),
    );
  }

  const abertas = ordens.filter((os) => os.status === "aberto");
  const emAndamento = ordens.filter((os) => os.status === "em_andamento");
  const finalizadas = ordens.filter((os) => os.status === "finalizado");

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
        <NewServiceForm onAdicionar={adicionarOrdem} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-slate-700">Aberto</h2>
            {abertas.map((os) => (
              <ServiceCard key={os.id} os={os} onMudarStatus={mudarStatus} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-slate-700">Em Andamento</h2>
            {emAndamento.map((os) => (
              <ServiceCard key={os.id} os={os} onMudarStatus={mudarStatus} />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-slate-700">Finalizado</h2>
            {finalizadas.map((os) => (
              <ServiceCard key={os.id} os={os} onMudarStatus={mudarStatus} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
