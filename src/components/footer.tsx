import {
  BentoMeIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "./icons";
import { siteConfig } from "./links";

// Avaliado no import: chamar new Date() durante o render quebraria a
// pureza que o React Compiler exige.
const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "Bento", href: siteConfig.links.bento, Icon: BentoMeIcon },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: YouTubeIcon },
];

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 flex w-full items-center justify-center border-t border-zinc-950/10 bg-zinc-200 py-2 text-center font-poppins shadow-[0px_-3px_12px_-8px_rgba(0,_0,_0,_1)]">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center justify-between gap-y-1 px-4 sm:px-6 md:flex-row">
        <p className="font-medium">
          © {CURRENT_YEAR} Kohako.dev, Inc. All rights reserved.
        </p>
        <ul className="flex items-center justify-center gap-x-2">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex rounded text-zinc-800 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
