export interface OrdemServico {
  id: number;
  nomeCliente: string;
  modeloAparelho: string;
  defeito: string;
  status: "aberto" | "em_andamento" | "finalizado";
}
