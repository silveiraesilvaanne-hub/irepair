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

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
        <NewServiceForm onAdicionar={adicionarOrdem} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ordens.map((os) => (
            <ServiceCard key={os.id} os={os} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
