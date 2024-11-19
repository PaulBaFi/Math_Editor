export interface SymbolGroup {
  title: string;
  symbol: string;
}

// Arrows Collection
export const arrows: SymbolGroup[] = [
  { title: "Left Arrow", symbol: "←" },
  { title: "Up Arrow", symbol: "↑" },
  { title: "Right Arrow", symbol: "→" },
  { title: "Down Arrow", symbol: "↓" },
  { title: "Northwest Arrow", symbol: "↖" },
  { title: "Northeast Arrow", symbol: "↗" },
  { title: "Southeast Arrow", symbol: "↘" },
  { title: "Southwest Arrow", symbol: "↙" },
  { title: "Left Double Arrow", symbol: "⇐" },
  { title: "Right Double Arrow", symbol: "⇒" },
  { title: "Left-Right Double Arrow", symbol: "⇔" },
];

// Fractions Collection
export const fractions: SymbolGroup[] = [
  { title: "One Quarter", symbol: "¼" },
  { title: "One Half", symbol: "½" },
  { title: "Three Quarters", symbol: "¾" },
  { title: "One Seventh", symbol: "⅐" },
  { title: "One Ninth", symbol: "⅑" },
  { title: "One Tenth", symbol: "⅒" },
  { title: "One Third", symbol: "⅓" },
  { title: "Two Thirds", symbol: "⅔" },
  { title: "One Fifth", symbol: "⅕" },
  { title: "Two Fifths", symbol: "⅖" },
  { title: "Three Fifths", symbol: "⅗" },
  { title: "Four Fifths", symbol: "⅘" },
  { title: "One Sixth", symbol: "⅙" },
  { title: "Five Sixths", symbol: "⅚" },
  { title: "One Eighth", symbol: "⅛" },
  { title: "Three Eighths", symbol: "⅜" },
  { title: "Five Eighths", symbol: "⅝" },
  { title: "Seven Eighths", symbol: "⅞" },
];

// Double Struck Collection
export const doubleStruck: SymbolGroup[] = [
  { title: "Double Struck A", symbol: "𝔸" },
  { title: "Double Struck B", symbol: "𝔹" },
  { title: "Double Struck D", symbol: "𝔻" },
  { title: "Double Struck E", symbol: "𝔼" },
  { title: "Double Struck F", symbol: "𝔽" },
  { title: "Double Struck G", symbol: "𝔾" },
  { title: "Double Struck I", symbol: "𝕀" },
  { title: "Double Struck J", symbol: "𝕁" },
  { title: "Double Struck K", symbol: "𝕂" },
  { title: "Double Struck L", symbol: "𝕃" },
  { title: "Double Struck M", symbol: "𝕄" },
  { title: "Double Struck O", symbol: "𝕆" },
  { title: "Double Struck S", symbol: "𝕊" },
  { title: "Double Struck T", symbol: "𝕋" },
  { title: "Double Struck U", symbol: "𝕌" },
  { title: "Double Struck V", symbol: "𝕍" },
  { title: "Double Struck W", symbol: "𝕎" },
  { title: "Double Struck X", symbol: "𝕏" },
  { title: "Double Struck Y", symbol: "𝕐" },
];

// Greek Alphabet Collection
export const greekAlphabet: SymbolGroup[] = [
  { title: "Greek Phi", symbol: "Φ" },
  { title: "Greek Chi", symbol: "Χ" },
  { title: "Greek Psi", symbol: "Ψ" },
  { title: "Greek Omega", symbol: "Ω" },
  { title: "Greek Iota with Diaeresis", symbol: "Ϊ" },
  { title: "Greek Upsilon with Diaeresis", symbol: "Ϋ" },
  { title: "Greek alpha", symbol: "α" },
  { title: "Greek beta", symbol: "β" },
  { title: "Greek epsilon", symbol: "ε" },
  { title: "Greek eta", symbol: "η" },
  { title: "Greek theta", symbol: "θ" },
  { title: "Greek kappa", symbol: "κ" },
  { title: "Greek lambda", symbol: "λ" },
  { title: "Greek mu", symbol: "μ" },
  { title: "Greek pi", symbol: "π" },
  { title: "Greek rho", symbol: "ρ" },
  { title: "Greek sigma", symbol: "σ" },
  { title: "Greek final sigma", symbol: "ς" },
  { title: "Greek phi", symbol: "θ" },
  { title: "Greek chi", symbol: "φ" },
  { title: "Greek psi", symbol: "χ" },
  { title: "Greek omega", symbol: "ψ" },
];

// Arithmetic Operators
export const arithmeticOperators: SymbolGroup[] = [
  { title: "Suma", symbol: "+" },
  { title: "Resta", symbol: "−" },
  { title: "Multiplicación", symbol: "×" },
  { title: "División", symbol: "÷" },
  { title: "División fraccionaria", symbol: "∕" },
  { title: "Producto", symbol: "·" },
  { title: "Módulo", symbol: "%" },
  { title: "Más o menos", symbol: "±" },
  { title: "Menos o más", symbol: "∓" },
];

// Relational Operators
export const relationalOperators: SymbolGroup[] = [
  { title: "Igual", symbol: "=" },
  { title: "No igual", symbol: "≠" },
  { title: "Menor que", symbol: "<" },
  { title: "Mayor que", symbol: ">" },
  { title: "Menor o igual que", symbol: "≤" },
  { title: "Mayor o igual que", symbol: "≥" },
];

// Logical Operators
export const logicalOperators: SymbolGroup[] = [
  { title: "Y lógico", symbol: "∧" },
  { title: "O lógico", symbol: "∨" },
  { title: "XOR", symbol: "⊕" },
  { title: "Negación", symbol: "¬" },
  { title: "Implicación", symbol: "⇒" },
  { title: "Doble implicación", symbol: "⇔" },
  { title: "Integral", symbol: "ʃ" },
  { title: "Doble Integral", symbol: "∬" },
  { title: "Tres Integral", symbol: "∭" },
];

// Set Symbols
export const setSymbols: SymbolGroup[] = [
  { title: "Pertenece", symbol: "∈" },
  { title: "No pertenece", symbol: "∉" },
  { title: "Unión", symbol: "∪" },
  { title: "Intersección", symbol: "∩" },
  { title: "Subconjunto", symbol: "⊂" },
  { title: "Subconjunto o igual", symbol: "⊆" },
  { title: "Conjunto vacío", symbol: "∅" },
];

// Function Symbols
export const functionSymbols: SymbolGroup[] = [
  { title: "Función", symbol: "f(x)" },
  { title: "Derivada", symbol: "′" },
  { title: "Integral", symbol: "∫" },
  { title: "Derivada parcial", symbol: "∂" },
  { title: "Nabla, gradiente", symbol: "∇" },
  { title: "Suma", symbol: "Σ" },
  { title: "Producto", symbol: "Π" },
];

// Algebra Symbols
export const algebraSymbols: SymbolGroup[] = [
  { title: "Suma directa", symbol: "⊕" },
  { title: "Producto tensorial", symbol: "⊗" },
  { title: "Proporcional", symbol: "∝" },
  { title: "Raíz cuadrada", symbol: "√" },
  { title: "Raíz n-ésima", symbol: "ⁿ√" },
  { title: "Valor absoluto", symbol: "|x|" },
  { title: "Factorial", symbol: "!" },
  { title: "Potencia", symbol: "^" },
  { title: "Producto interno", symbol: "⟨ , ⟩" },
];

// Geometry Symbols
export const geometrySymbols: SymbolGroup[] = [
  { title: "Seno", symbol: "sin" },
  { title: "Coseno", symbol: "cos" },
  { title: "Tangente", symbol: "tan" },
  { title: "Cotangente", symbol: "cot" },
  { title: "Secante", symbol: "sec" },
  { title: "Cosecante", symbol: "csc" },
  { title: "Seno inverso", symbol: "sin⁻¹" },
  { title: "Coseno inverso", symbol: "cos⁻¹" },
  { title: "Tangente inversa", symbol: "tan⁻¹" },
  { title: "Cotangente inversa", symbol: "cot⁻¹" },
  { title: "Secante inversa", symbol: "sec⁻¹" },
  { title: "Cosecante inversa", symbol: "csc⁻¹" },
];

// Logic Symbols
export const logicSymbols: SymbolGroup[] = [
  { title: "Para todo", symbol: "∀" },
  { title: "Existe", symbol: "∃" },
  { title: "Existe exactamente uno", symbol: "∃!" },
  { title: "Se deriva", symbol: "⊢" },
  { title: "Satisfactorio", symbol: "⊨" },
];

// Number Theory Symbols
export const numberTheorySymbols: SymbolGroup[] = [
  { title: "Números naturales", symbol: "ℕ" },
  { title: "Números enteros", symbol: "ℤ" },
  { title: "Números racionales", symbol: "ℚ" },
  { title: "Números reales", symbol: "ℝ" },
  { title: "Números complejos", symbol: "ℂ" },
];

export const mathGroupingSymbols: SymbolGroup[] = [
  { title: "Paréntesis", symbol: "(x)" },
  { title: "Llaves", symbol: "{x}" },
  { title: "Corchetes", symbol: "[x]" },
  { title: "Barra vertical", symbol: "|x|" },
  { title: "Angulares", symbol: "<x>" },
];
