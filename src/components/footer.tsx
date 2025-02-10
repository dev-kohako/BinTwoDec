import { BentoMeIcon, GithubIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./icons"
import { siteConfig } from "./links"

export const Footer = () => {
  return (
    <footer className="bg-zinc-200 border-b border-zinc-950/10 shadow-[0px_-3px_12px_-8px_rgba(0,_0,_0,_1)] text-center py-2 z-50 fixed bottom-0 w-full flex justify-center items-center">
      <div className="items-center justify-between max-w-[1024px] container md:mx-6 flex-grow md:flex md:items-center mx-auto md:justify-between">
        <div className="text-center mb-1 font-medium">
          © 2025 Kohako.dev, Inc. All rights reserved.
        </div>
        <div className="flex justify-center items-center space-x-2">
          <a href={siteConfig.links.github}>
            <GithubIcon className="text-zinc-800" />
          </a>
          <a href={siteConfig.links.linkedin}>
            <LinkedInIcon className="text-zinc-800" />
          </a>
          <a href={siteConfig.links.instagram}>
            <InstagramIcon className="text-zinc-800"  />
          </a>
          <a href={siteConfig.links.bento}>
            <BentoMeIcon className="text-zinc-800" />
          </a>
          <a href={siteConfig.links.youtube}>
            <YouTubeIcon className="text-zinc-800" />
          </a>
        </div>
      </div>
    </footer>
  )
}