import type { IconSvgProps } from "../types";

/**
 * Unico icone de marca que continua desenhado aqui: o Lucide 1.x removeu
 * todos os icones de marca, e o Simple Icons removeu especificamente o da
 * LinkedIn por pedido de titular. Os outros quatro vem do Simple Icons.
 */
export const LinkedInIcon = ({
  size = 20,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    height={height ?? size}
    viewBox="0 0 24 24"
    width={width ?? size}
    {...props}
  >
    <path
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      fill="currentColor"
    />
  </svg>
);
