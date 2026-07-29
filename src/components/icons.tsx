import type { IconSvgProps } from "../types";

export const InstagramIcon = ({
  size = 24,
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
      d="M16 2H8C4.69 2 2 4.69 2 8v8c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6zm4 14c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v8z"
      fill="currentColor"
    />
    <path
      d="M12 7a5 5 0 105 5 5.006 5.006 0 00-5-5zm0 8a3 3 0 113-3 3.009 3.009 0 01-3 3zM18.5 6.5a1.5 1.5 0 11-1.5-1.5 1.503 1.503 0 011.5 1.5z"
      fill="currentColor"
    />
  </svg>
);

export const BentoMeIcon = ({
  size = 24,
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
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
  </svg>
);

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

export const YouTubeIcon = ({
  size = 26,
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
      d="M21.58 7.35a2.54 2.54 0 00-1.79-1.8C18.04 5 12 5 12 5s-6.04 0-7.79.55a2.54 2.54 0 00-1.79 1.8A26.12 26.12 0 002 12a26.12 26.12 0 00.42 4.65 2.54 2.54 0 001.79 1.8C5.96 19 12 19 12 19s6.04 0 7.79-.55a2.54 2.54 0 001.79-1.8A26.12 26.12 0 0022 12a26.12 26.12 0 00-.42-4.65zM10 15V9l6 3z"
      fill="currentColor"
    />
  </svg>
);

export const GithubIcon = ({
  size = 24,
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
      clipRule="evenodd"
      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
