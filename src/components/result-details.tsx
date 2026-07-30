import { ChevronDown } from "lucide-react";
import { buildExpansion, groupDigits } from "../lib/conversion";

interface ResultDetailsProps {
  open: boolean;
  onToggle: () => void;
  /** Forma binaria do valor, seja ela a entrada ou o resultado. */
  binary: string;
  /** Forma decimal do valor, seja ela a entrada ou o resultado. */
  decimal: string;
  /** O resultado exibido no card, que e o que nao caberia no input. */
  result: string;
  resultIsBinary: boolean;
  label: string;
}

export const ResultDetails = ({
  open,
  onToggle,
  binary,
  decimal,
  result,
  resultIsBinary,
  label,
}: ResultDetailsProps) => {
  const expansion = buildExpansion(binary);
  const unit = resultIsBinary ? "bits" : "dígitos";

  return (
    <section className="w-full max-w-[var(--content-max)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="result-details"
        className="mx-auto flex items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors duration-300 hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
      >
        {open ? "Ocultar cálculo completo" : "Ver cálculo completo"}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* 0fr -> 1fr anima a abertura sem precisar saber a altura do conteudo. */}
      <div
        id="result-details"
        data-open={open}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out data-[open=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <div className="mt-3 flex flex-col gap-y-4 rounded-xl bg-[var(--card-surface)] p-4 text-sm shadow-[var(--card-shadow)] transition-[background-color,box-shadow] duration-300">
            <div>
              <h2 className="font-medium">
                {label} completo · {result.length} {unit}
              </h2>
              <p className="mt-1 font-mono break-all text-zinc-700 dark:text-zinc-300">
                {groupDigits(result, resultIsBinary ? 4 : 3)}
              </p>
            </div>

            <div>
              <h2 className="font-medium">
                Cálculo · soma das potências de 2 dos bits ligados
              </h2>
              <div className="mt-1 flex flex-col gap-y-0.5 font-mono break-words text-zinc-700 dark:text-zinc-300">
                <p>
                  {expansion.terms.map((term, index) => (
                    <span key={term.exponent}>
                      {index > 0 && " + "}2<sup>{term.exponent}</sup>
                    </span>
                  ))}
                  {expansion.omittedTerms > 0 &&
                    ` + … (${expansion.omittedTerms} de ${expansion.totalTerms} termos omitidos)`}
                </p>

                {expansion.showValues && (
                  <p>
                    = {expansion.terms.map((term) => term.value).join(" + ")}
                    {expansion.omittedTerms > 0 && " + …"}
                  </p>
                )}

                <p>= {decimal} em decimal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
