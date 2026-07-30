import { describe, expect, it } from "vitest";
import {
  buildExpansion,
  convert,
  groupDigits,
  INPUT_RULES,
  MAX_EXPANSION_TERMS,
  RESULT_VISIBLE_CHARS,
} from "./conversion";

describe("convert", () => {
  it("devolve string vazia para entrada vazia, nos dois modos", () => {
    // Antes exibia "Inválido" no carregamento inicial e ao apagar a entrada.
    expect(convert("", "decimal")).toBe("");
    expect(convert("", "binary")).toBe("");
  });

  it("converte decimal para binário", () => {
    expect(convert("10", "decimal")).toBe("1010");
    expect(convert("0", "decimal")).toBe("0");
    expect(convert("255", "decimal")).toBe("11111111");
  });

  it("converte binário para decimal", () => {
    expect(convert("1010", "binary")).toBe("10");
    expect(convert("0", "binary")).toBe("0");
    expect(convert("11111111", "binary")).toBe("255");
  });

  it("ignora zeros à esquerda em vez de tratá-los como octal", () => {
    expect(convert("0010", "decimal")).toBe("1010");
    expect(convert("0000", "binary")).toBe("0");
  });

  describe("regressões", () => {
    it("rejeita dígitos fora do alfabeto binário em vez de truncar", () => {
      // parseInt("19", 2) devolvia 1: parava no primeiro dígito inválido e
      // exibia um resultado errado sem nenhum aviso.
      expect(convert("19", "binary")).toBe("Inválido");
      expect(convert("12", "binary")).toBe("Inválido");
      expect(convert("2", "binary")).toBe("Inválido");
    });

    it("mantém precisão acima de Number.MAX_SAFE_INTEGER", () => {
      // Com Number, os 64 bits davam 18446744073709552000.
      expect(convert("1".repeat(64), "binary")).toBe("18446744073709551615");
      expect(convert("9007199254740993", "decimal")).toBe(
        "100000000000000000000000000000000000000000000000000001",
      );
    });

    it("não estoura para Infinity em entradas longas", () => {
      // parseInt devolvia Infinity, e como isNaN(Infinity) é false o campo
      // exibia a string "Infinity".
      const resultado = convert("9".repeat(400), "decimal");
      expect(resultado).not.toBe("Infinity");
      expect(resultado).toMatch(/^[01]+$/);
      expect(BigInt(`0b${resultado}`).toString(10)).toBe("9".repeat(400));
    });
  });

  it("marca entrada inválida como Inválido", () => {
    expect(convert("abc", "decimal")).toBe("Inválido");
    expect(convert("1.5", "decimal")).toBe("Inválido");
    expect(convert("-1", "decimal")).toBe("Inválido");
  });

  it("faz round-trip em valores de até 200 bits", () => {
    // Determinístico de propósito: um gerador pseudoaleatório com semente
    // fixa mantém a falha reproduzível quando aparecer.
    let semente = 42;
    const proximo = () => {
      semente = (semente * 1103515245 + 12345) % 2147483648;
      return semente / 2147483648;
    };

    for (let i = 0; i < 500; i++) {
      const bits = 1 + Math.floor(proximo() * 200);
      let binario = "1";
      for (let j = 1; j < bits; j++) binario += proximo() < 0.5 ? "0" : "1";

      const decimal = convert(binario, "binary");
      expect(convert(decimal, "decimal")).toBe(binario);
    }
  });
});

describe("groupDigits", () => {
  it("agrupa a partir da direita, deixando o resto na primeira casa", () => {
    expect(groupDigits("110101", 4)).toBe("11 0101");
    expect(groupDigits("1234567", 3)).toBe("1 234 567");
  });

  it("não deixa grupo vazio quando o tamanho é múltiplo exato", () => {
    expect(groupDigits("11110000", 4)).toBe("1111 0000");
    expect(groupDigits("123456", 3)).toBe("123 456");
  });

  it("devolve o valor intacto quando é menor que o grupo", () => {
    expect(groupDigits("11", 4)).toBe("11");
    expect(groupDigits("", 4)).toBe("");
  });

  it("preserva todos os dígitos, só inserindo espaços", () => {
    const valor = "1".repeat(64);
    expect(groupDigits(valor, 4).replace(/ /g, "")).toBe(valor);
  });
});

describe("buildExpansion", () => {
  it("lista só os bits ligados, com o expoente da posição", () => {
    const { terms, totalTerms, omittedTerms } = buildExpansion("1011");

    expect(totalTerms).toBe(3);
    expect(omittedTerms).toBe(0);
    expect(terms).toEqual([
      { exponent: 3, value: "8" },
      { exponent: 1, value: "2" },
      { exponent: 0, value: "1" },
    ]);
  });

  it("soma dos termos reproduz o valor decimal", () => {
    for (const binario of ["1", "1010", "110101", "1".repeat(31)]) {
      // Limite alto de propósito: com o padrão de 12 termos a soma não
      // fecharia para valores com mais bits ligados que isso, o que é o
      // comportamento correto do truncamento, não um erro de cálculo.
      const { terms } = buildExpansion(binario, binario.length);
      const soma = terms.reduce((total, t) => total + BigInt(t.value), 0n);
      expect(soma.toString()).toBe(convert(binario, "binary"));
    }
  });

  it("limita os termos exibidos e informa quantos ficaram de fora", () => {
    const { terms, totalTerms, omittedTerms } = buildExpansion("1".repeat(64));

    expect(totalTerms).toBe(64);
    expect(terms).toHaveLength(MAX_EXPANSION_TERMS);
    expect(omittedTerms).toBe(64 - MAX_EXPANSION_TERMS);
  });

  it("mantém os termos de maior expoente ao truncar", () => {
    const { terms } = buildExpansion("1".repeat(64));

    // Sem .at(-1): o projeto tem lib ES2020, e mudar o target por
    // conveniência de teste não se justifica.
    expect(terms[0].exponent).toBe(63);
    expect(terms[terms.length - 1].exponent).toBe(63 - (MAX_EXPANSION_TERMS - 1));
  });

  it("só oferece os valores das potências enquanto são legíveis", () => {
    // Acima do expoente 31 cada parcela passa de 10 dígitos.
    expect(buildExpansion("1".repeat(32)).showValues).toBe(true);
    expect(buildExpansion("1".repeat(33)).showValues).toBe(false);
  });

  it("respeita um limite de termos passado explicitamente", () => {
    const { terms, omittedTerms } = buildExpansion("1111", 2);

    expect(terms).toHaveLength(2);
    expect(omittedTerms).toBe(2);
  });

  it("não produz termo algum para um binário sem bits ligados", () => {
    const { terms, totalTerms } = buildExpansion("0000");

    expect(terms).toEqual([]);
    expect(totalTerms).toBe(0);
  });
});

describe("INPUT_RULES", () => {
  it("aceita apenas 0 e 1 no modo binário", () => {
    const { pattern } = INPUT_RULES.binary;

    expect(pattern.test("1010")).toBe(true);
    expect(pattern.test("")).toBe(true);
    expect(pattern.test("2")).toBe(false);
    expect(pattern.test("19")).toBe(false);
  });

  it("aceita qualquer dígito no modo decimal, e nada além disso", () => {
    const { pattern } = INPUT_RULES.decimal;

    expect(pattern.test("1234567890")).toBe(true);
    expect(pattern.test("")).toBe(true);
    expect(pattern.test("1a")).toBe(false);
    expect(pattern.test("1.5")).toBe(false);
    expect(pattern.test("-1")).toBe(false);
  });

  it("recusa dígitos não-ASCII, que BigInt também não aceitaria", () => {
    // \d em JavaScript é ASCII, e é disso que a validação depende.
    expect(INPUT_RULES.decimal.pattern.test("١٢٣")).toBe(false);
  });

  it("traz um aviso próprio por modo", () => {
    expect(INPUT_RULES.binary.warning).not.toBe(INPUT_RULES.decimal.warning);
  });
});

describe("RESULT_VISIBLE_CHARS", () => {
  it("é o limite a partir do qual o painel de cálculo é oferecido", () => {
    // 20 dígitos decimais cabem no campo; 64 bits não.
    expect(convert("1".repeat(64), "binary").length).toBeLessThanOrEqual(
      RESULT_VISIBLE_CHARS,
    );
    expect(convert("18446744073709551615", "decimal").length).toBeGreaterThan(
      RESULT_VISIBLE_CHARS,
    );
  });
});
