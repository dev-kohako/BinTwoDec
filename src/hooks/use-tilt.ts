import { useRef, type PointerEvent } from "react";

interface TiltOptions {
  /** Ângulo máximo de inclinação, nas duas direções. */
  maxDeg?: number;
}

/**
 * Inclinação seguindo o ponteiro, escrita direto no style do elemento em vez
 * de estado: a 60fps um render do React por movimento seria descartado no
 * frame seguinte. O CSS de .card-3d consome as variáveis daqui.
 */
export function useTilt<T extends HTMLElement>({ maxDeg = 7 }: TiltOptions = {}) {
  const ref = useRef<T>(null);

  const onPointerMove = (event: PointerEvent<T>) => {
    const element = ref.current;
    // Em toque não há ponteiro para acompanhar, e o CSS já desliga o tilt.
    if (!element || event.pointerType !== "mouse") return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * maxDeg}deg`);
    element.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * maxDeg}deg`);
    element.style.setProperty("--glare-x", `${x * 100}%`);
    element.style.setProperty("--glare-y", `${y * 100}%`);
    element.style.setProperty("--glare-opacity", "1");
    // Sob o ponteiro a transição é curta o suficiente para suavizar sem dar
    // sensação de atraso; na saída, longa, para o retorno ser calmo.
    element.style.setProperty("--tilt-ease", "90ms");
  };

  const onPointerLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--tilt-ease", "450ms");
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--glare-opacity", "0");
  };

  return { ref, onPointerMove, onPointerLeave };
}
