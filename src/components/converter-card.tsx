import type { ChangeEvent, ReactNode } from "react";
import { useTilt } from "../hooks/use-tilt";

interface ConverterCardProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Faz o card anunciar mudanças de valor a leitores de tela. */
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
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="card-3d flex min-h-[7.5rem] w-full max-w-[15rem] flex-col items-center justify-center gap-y-1 rounded-xl bg-zinc-200 px-4 shadow-[var(--card-shadow)] md:max-w-none dark:bg-zinc-900"
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
