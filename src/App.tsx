import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Table } from "./components/table";
import { Notification } from "./components/notification";
import { ConverterCard } from "./components/converter-card";

type Mode = "decimal" | "binary";

const NOTIFICATION_TIMEOUT_MS = 3000;

/** Evita travar a UI se colarem uma entrada absurdamente longa. */
const MAX_INPUT_LENGTH = 1024;

const INPUT_RULES: Record<Mode, { pattern: RegExp; warning: string }> = {
  decimal: { pattern: /^\d*$/, warning: "Apenas números" },
  binary: { pattern: /^[01]*$/, warning: "Apenas 0 e 1" },
};

/**
 * Converte com BigInt para não perder precisão acima de
 * Number.MAX_SAFE_INTEGER nem estourar para Infinity em entradas longas.
 */
function convert(value: string, mode: Mode): string {
  if (value === "") return "";

  try {
    return mode === "binary"
      ? BigInt(`0b${value}`).toString(10)
      : BigInt(value).toString(2);
  } catch {
    return "Inválido";
  }
}

function App() {
  const [number, setNumber] = useState("");
  const [mode, setMode] = useState<Mode>("decimal");
  const [warning, setWarning] = useState("");
  const warningTimeout = useRef<number | null>(null);

  // O resultado é derivado da entrada: sem estado espelhado nem efeito.
  const result = convert(number, mode);
  const sourceLabel = mode === "binary" ? "Binário" : "Decimal";
  const targetLabel = mode === "binary" ? "Decimal" : "Binário";

  useEffect(() => {
    return () => {
      if (warningTimeout.current !== null) {
        clearTimeout(warningTimeout.current);
      }
    };
  }, []);

  const showWarning = (message: string) => {
    setWarning(message);

    if (warningTimeout.current !== null) {
      clearTimeout(warningTimeout.current);
    }
    warningTimeout.current = window.setTimeout(() => {
      setWarning("");
      warningTimeout.current = null;
    }, NOTIFICATION_TIMEOUT_MS);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const rule = INPUT_RULES[mode];

    if (!rule.pattern.test(newValue)) {
      showWarning(rule.warning);
      return;
    }

    if (newValue.length > MAX_INPUT_LENGTH) {
      showWarning(`Máximo de ${MAX_INPUT_LENGTH} dígitos`);
      return;
    }

    setNumber(newValue);
    setWarning("");
  };

  const toggleMode = () => {
    setMode((previous) => (previous === "binary" ? "decimal" : "binary"));
    setNumber("");
    setWarning("");
  };

  return (
    <>
      <Navbar />
      <Notification text={warning} active={warning !== ""} />
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-10 bg-zinc-200 px-4 pt-20 pb-28 font-poppins transition-colors duration-300 sm:px-6 md:pb-24 lg:px-8 dark:bg-zinc-900 dark:text-zinc-100">
        <h1 className="sr-only">Conversor de binário e decimal</h1>

        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <ConverterCard
            id="source-value"
            label={sourceLabel}
            value={number}
            onChange={handleChange}
            placeholder={mode === "binary" ? "Ex.: 1010" : "Ex.: 10"}
          />

          <button
            type="button"
            onClick={toggleMode}
            className="rounded-xl border-2 border-zinc-200 bg-zinc-900 px-2 py-1 text-zinc-200 transition-colors duration-300 hover:bg-zinc-800 active:bg-zinc-700 dark:border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-400"
          >
            Trocar
          </button>

          <ConverterCard
            id="result-value"
            label={targetLabel}
            value={result}
            readOnly
            live
          />
        </div>
        <Table />
      </main>
      <Footer />
    </>
  );
}

export default App;
