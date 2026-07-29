import {
  SiBento,
  SiGithub,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "./icons";
import { siteConfig } from "./links";

// Avaliado no import: chamar new Date() durante o render quebraria a
// pureza que o React Compiler exige.
const CURRENT_YEAR = new Date().getFullYear();

const ICON_SIZE = 16;

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, Icon: SiGithub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: SiInstagram },
  { label: "Bento", href: siteConfig.links.bento, Icon: SiBento },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: SiYoutube },
];

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 flex w-full items-center justify-center border-t border-zinc-950/10 bg-zinc-200 py-2 text-center shadow-[0px_-3px_12px_-8px_rgba(0,_0,_0,_1)] transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center justify-between gap-y-1 px-4 sm:px-6 md:flex-row">
        <p className="text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
          © {CURRENT_YEAR} Kohako.dev, Inc. All rights reserved.
        </p>
        <ul className="flex items-center justify-center gap-x-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex rounded text-zinc-800 transition-colors duration-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-200 dark:hover:text-white dark:focus-visible:outline-zinc-100"
              >
                {/* O nome acessível vem do aria-label do link. Os ícones do
                    Simple Icons trazem <title> próprio, que sem isso viraria
                    um gráfico nomeado redundante dentro do link. */}
                <Icon size={ICON_SIZE} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
