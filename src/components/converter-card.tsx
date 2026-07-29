import { useRef, type ChangeEvent, type PointerEvent, type ReactNode } from "react";

/** Angulo maximo de inclinacao, nas duas direcoes. */
const MAX_TILT_DEG = 7;

interface ConverterCardProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Faz o card anunciar mudancas de valor a leitores de tela. */
  live?: boolean;
  children?: ReactNode;
}

export const ConverterCard = ({
  id,
  label,
  value,
  placeholder,
  readOnly = false,
  onChange,
  live = false,
  children,
}: ConverterCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    // Em toque nao ha ponteiro para acompanhar, e o CSS ja desliga o tilt.
    if (!card || event.pointerType !== "mouse") return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    // Escrita direta no style em vez de estado: a 60fps, um render do React
    // por movimento do ponteiro seria descartado no frame seguinte.
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * MAX_TILT_DEG}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * MAX_TILT_DEG}deg`);
    card.style.setProperty("--glare-x", `${x * 100}%`);
    card.style.setProperty("--glare-y", `${y * 100}%`);
    card.style.setProperty("--glare-opacity", "1");
    // Enquanto o ponteiro esta em cima, a transicao e curta o suficiente
    // para suavizar sem dar sensacao de atraso.
    card.style.setProperty("--tilt-ease", "90ms");
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Na saida, volta devagar ao repouso.
    card.style.setProperty("--tilt-ease", "450ms");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--glare-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      className="card-3d flex min-h-[7.5rem] w-full max-w-[15rem] flex-col items-center justify-center gap-y-1 rounded-xl bg-zinc-200 px-4 shadow-[var(--card-shadow)] dark:bg-zinc-900"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-live={live ? "polite" : undefined}
    >
      <label htmlFor={id} className="text-lg font-medium">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-2xl border border-zinc-900 px-2 py-1 text-center font-mono transition-colors duration-300 outline-zinc-900 placeholder:font-sans placeholder:text-zinc-500 dark:border-zinc-100 dark:outline-zinc-100 dark:placeholder:text-zinc-400"
        value={value}
        onChange={onChange}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {children}
    </div>
  );
};
