type TEstrela = Array<{ user: string; starred_at: number }>;
type TAgrupamento = "dia" | "semana" | "mes" | "ano";
type TEscala = "linear" | "logaritmica";

interface Historico {
  estrelas: TEstrela;
  agrupamento?: TAgrupamento;
  escala?: TEscala;
  onAgrupamentoChange?: (valor: TAgrupamento) => void;
  onEscalaChange?: (valor: TAgrupamento) => void;
}
