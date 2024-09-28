export interface Key {
  id: string;
  label: string;
  symbol: string;
  isSymbol: boolean;
  group: string;
}

export const mathKeys: Key[] = [
  { id: "suma", label: "+", symbol: "+", isSymbol: true, group: "simple" },
  { id: "resta", label: "-", symbol: "-", isSymbol: false, group: "simple" },
  { id: "division", label: "÷", symbol: "÷", isSymbol: true, group: "simple" },
  {
    id: "multiplicación",
    label: "×",
    symbol: "×",
    isSymbol: true,
    group: "simple",
  },
  { id: "potencia", label: "^", symbol: "^", isSymbol: false, group: "simple" },
  { id: "igual", label: "=", symbol: "=", isSymbol: true, group: "simple" },
];
