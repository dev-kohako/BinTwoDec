import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Table } from "./components/table";
import { Notification } from "./components/notification";

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
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-10 bg-zinc-200 px-4 pt-20 pb-28 font-poppins sm:px-6 md:pb-24 lg:px-8">
        <h1 className="sr-only">Conversor de binário e decimal</h1>

        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <div className="flex min-h-[7.5rem] w-full max-w-[15rem] flex-col items-center justify-center gap-y-1 rounded-xl bg-zinc-200 px-4 shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff] drop-shadow-xl">
            <label htmlFor="source-value" className="text-lg font-medium">
              {sourceLabel}
            </label>
            <input
              id="source-value"
              className="w-full rounded-2xl border border-zinc-900 px-2 py-1 text-center outline-zinc-900"
              value={number}
              onChange={handleChange}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              placeholder={mode === "binary" ? "Ex.: 1010" : "Ex.: 10"}
            />
          </div>

          <button
            type="button"
            onClick={toggleMode}
            className="rounded-xl border-2 border-zinc-200 bg-zinc-900 px-2 py-1 text-zinc-200 hover:bg-zinc-800 active:bg-zinc-700"
          >
            Trocar
          </button>

          <div
            className="flex min-h-[7.5rem] w-full max-w-[15rem] flex-col items-center justify-center gap-y-1 rounded-xl bg-zinc-200 px-4 shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff] drop-shadow-xl"
            aria-live="polite"
          >
            <label htmlFor="result-value" className="text-lg font-medium">
              {targetLabel}
            </label>
            <input
              id="result-value"
              className="w-full rounded-2xl border border-zinc-900 px-2 py-1 text-center"
              value={result}
              type="text"
              readOnly
            />
          </div>
        </div>
        <Table />
      </main>
      <Footer />
    </>
  );
}

export default App;
