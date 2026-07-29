import type { IconSvgProps } from "../types";

/**
 * Segue a linguagem da marca KWK: barras diagonais grossas de pontas
 * arredondadas em grade de 45 graus. Aqui a diagonal e o eixo da conversao e
 * os dois pontos nas quinas opostas sao as duas bases numericas.
 * Sem texto, então não depende de fonte, e todo em currentColor, então
 * acompanha o tema sem variante dark:.
 */
export const Logo = ({ size = 20, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height={height ?? size}
    viewBox="0 0 32 32"
    width={width ?? size}
    {...props}
  >
    <path
      d="M9.5 22.5 L22.5 9.5"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <circle cx="9.5" cy="9.5" r="2.6" fill="currentColor" />
    <circle cx="22.5" cy="22.5" r="2.6" fill="currentColor" />
  </svg>
);
