import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Table } from "./components/table";
import { Notification } from "./components/notification";
import { ConverterCard } from "./components/converter-card";
import { ResultDetails } from "./components/result-details";
import {
  convert,
  INPUT_RULES,
  RESULT_VISIBLE_CHARS,
  type Mode,
} from "./lib/conversion";

const NOTIFICATION_TIMEOUT_MS = 3000;

/** Evita travar a UI se colarem uma entrada absurdamente longa. */
const MAX_INPUT_LENGTH = 1024;

function App() {
  const [number, setNumber] = useState("");
  const [mode, setMode] = useState<Mode>("decimal");
  const [warning, setWarning] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const warningTimeout = useRef<number | null>(null);

  // O resultado é derivado da entrada: sem estado espelhado nem efeito.
  const result = convert(number, mode);
  const sourceLabel = mode === "binary" ? "Binário" : "Decimal";
  const targetLabel = mode === "binary" ? "Decimal" : "Binário";

  // O painel só é oferecido quando o resultado deixa de caber no input, e
  // some sozinho quando volta a caber: derivar evita um efeito para fechá-lo.
  const resultIsBinary = mode === "decimal";
  const canExpand =
    result !== "" && result !== "Inválido" && result.length > RESULT_VISIBLE_CHARS;

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
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-10 bg-zinc-200 px-4 pt-20 pb-28 transition-colors duration-300 sm:px-6 md:pb-24 lg:px-8 dark:bg-zinc-900 dark:text-zinc-100">
        <h1 className="sr-only">Conversor de binário e decimal</h1>

        {/* Grade em vez de flex: as duas colunas 1fr dividem o que sobra
            depois do botão, então a linha ocupa exatamente --content-max, a
            mesma largura da tabela, em vez de resultar da soma dos filhos. */}
        <div className="grid w-full max-w-[var(--content-max)] grid-cols-1 justify-items-center gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
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
            className="flex items-center gap-x-1.5 rounded-xl border-2 border-zinc-200 bg-zinc-900 px-2.5 py-1.5 text-zinc-200 transition-colors duration-300 hover:bg-zinc-800 active:bg-zinc-700 dark:border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-400"
          >
            {/* Em coluna os cards ficam um sobre o outro, então a seta aponta
                na direção que a troca realmente acontece. */}
            <ArrowLeftRight size={16} className="rotate-90 md:rotate-0" />
            Trocar
          </button>

          <ConverterCard
            id="result-value"
            label={targetLabel}
            value={result}
            placeholder="Resultado"
            readOnly
            live
          />
        </div>

        {canExpand && (
          <ResultDetails
            open={detailsOpen}
            onToggle={() => setDetailsOpen((previous) => !previous)}
            binary={resultIsBinary ? result : number}
            decimal={resultIsBinary ? number : result}
            result={result}
            resultIsBinary={resultIsBinary}
            label={targetLabel}
          />
        )}

        <Table />
      </main>
      <Footer />
    </>
  );
}

export default App;
