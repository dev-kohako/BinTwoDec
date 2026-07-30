export type Mode = "decimal" | "binary";

export const INPUT_RULES: Record<Mode, { pattern: RegExp; warning: string }> = {
  decimal: { pattern: /^\d*$/, warning: "Apenas números" },
  binary: { pattern: /^[01]*$/, warning: "Apenas 0 e 1" },
};

/** Acima disso o resultado nao cabe mais no input e vale oferecer o painel. */
export const RESULT_VISIBLE_CHARS = 20;

/** Termos da expansao exibidos antes de resumir o restante. */
export const MAX_EXPANSION_TERMS = 12;

/**
 * Ate esse expoente os valores das potencias ainda sao curtos o bastante
 * para caberem numa linha. Acima, so a linha de expoentes e mostrada.
 */
const MAX_VALUE_EXPONENT = 31;

/**
 * Converte com BigInt para nao perder precisao acima de
 * Number.MAX_SAFE_INTEGER nem estourar para Infinity em entradas longas.
 */
export function convert(value: string, mode: Mode): string {
  if (value === "") return "";

  try {
    const parsed = mode === "binary" ? BigInt(`0b${value}`) : BigInt(value);

    // O domínio aqui é número natural. O sinal não chega pela UI, que barra
    // "-" na validação, mas convert é exportado e devolver "-1" como binário
    // seria resultado sem significado. Encontrado pela suíte de testes.
    if (parsed < 0n) return "Inválido";

    return mode === "binary" ? parsed.toString(10) : parsed.toString(2);
  } catch {
    return "Inválido";
  }
}

/** Agrupa a partir da direita, para leitura de numeros longos. */
export function groupDigits(value: string, size: number): string {
  const groups: string[] = [];

  for (let end = value.length; end > 0; end -= size) {
    groups.unshift(value.slice(Math.max(0, end - size), end));
  }

  return groups.join(" ");
}

export interface ExpansionTerm {
  exponent: number;
  value: string;
}

export interface Expansion {
  terms: ExpansionTerm[];
  totalTerms: number;
  omittedTerms: number;
  showValues: boolean;
}

/**
 * A conversao nos dois sentidos e a mesma soma: cada bit ligado contribui
 * com 2 elevado a sua posicao. Um unico painel explica decimal -> binario e
 * binario -> decimal.
 */
export function buildExpansion(
  binary: string,
  maxTerms = MAX_EXPANSION_TERMS,
): Expansion {
  const highestExponent = binary.length - 1;
  const terms: ExpansionTerm[] = [];
  let totalTerms = 0;

  for (let index = 0; index < binary.length; index++) {
    if (binary[index] !== "1") continue;

    totalTerms++;
    if (terms.length >= maxTerms) continue;

    const exponent = highestExponent - index;
    terms.push({ exponent, value: (1n << BigInt(exponent)).toString(10) });
  }

  return {
    terms,
    totalTerms,
    omittedTerms: totalTerms - terms.length,
    showValues: highestExponent <= MAX_VALUE_EXPONENT,
  };
}
