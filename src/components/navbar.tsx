import { Moon, Sun } from "lucide-react";
import { Logo } from "./logo";
import { siteConfig } from "./links";
import { useTheme } from "../hooks/use-theme";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-center border-b border-zinc-950/10 bg-zinc-200 py-2 text-center shadow-[0px_3px_12px_-8px_rgba(0,_0,_0,_1)] transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
      <nav className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-4 sm:px-6">
        {/* items-center e não items-baseline: a baseline de um flex container
            vem do primeiro item, que aqui é o SVG, e a baseline de um SVG é a
            borda de baixo. Isso desalinhava "Bin2Dec" de "by KWK". */}
        <div className="flex items-center gap-x-1.5">
          <a
            href="/"
            className="flex items-center gap-x-1.5 rounded leading-none font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100"
          >
            <Logo size={20} className="shrink-0" />
            Bin2Dec
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-sm leading-none text-zinc-600 transition-colors duration-300 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
          >
            by KWK
          </a>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          aria-pressed={isDark}
          className="rounded-lg border border-zinc-950/10 p-1.5 text-zinc-800 transition-colors duration-300 hover:bg-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-100"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
};
