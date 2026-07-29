import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "bintwodec-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // localStorage indisponivel (modo privativo, cookies bloqueados).
    return null;
  }
}

/**
 * Resolvido no import, e nao no render: ler localStorage ou consultar o
 * matchMedia durante o render violaria a pureza exigida pelo compiler.
 * O mesmo calculo roda no script inline do index.html, que aplica a
 * classe antes do primeiro paint para nao piscar o tema claro.
 */
const INITIAL_THEME: Theme =
  readStoredTheme() ?? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(INITIAL_THEME);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Enquanto nao houver escolha explicita, o tema continua acompanhando o
  // sistema em tempo real.
  useEffect(() => {
    if (readStoredTheme() !== null) return;

    const media = window.matchMedia(DARK_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sem persistencia, a escolha vale apenas para a sessao atual.
    }
    setTheme(next);
  };

  return { theme, toggleTheme };
}
