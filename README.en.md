<div align="center">

<img src="./public/favicon.svg" width="76" height="76" alt="" />

# Bin2Dec

**Binary ↔ decimal converter with no precision limit.**

[![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React_Compiler-1.0-087EA4?style=flat-square)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Live demo**](https://bin-two-dec.vercel.app/) · [Português](README.md)

</div>

---

## What it is

Converts numbers between base 2 and base 10 in both directions, with
mode-aware input validation and arbitrary precision:
`1111111111111111111111111111111111111111111111111111111111111111` returns
`18446744073709551615`, exactly, not a rounded value.

When the result outgrows the field, a panel shows the whole number grouped for
reading plus the sum of powers of two that produces it.

## Interface

Light and dark themes, choice persisted and applied before first paint. Cards
with layered depth and pointer-tracking tilt, disabled on touch and under
`prefers-reduced-motion`.

<!-- To show the screenshots, drop both files in public/ and replace this
     comment with the block below:

| Light | Dark |
|:-----:|:----:|
| <img src="./public/screenshot-light.png" alt="Light theme" /> | <img src="./public/screenshot-dark.png" alt="Dark theme" /> |
-->

## Design decisions

What sets this apart from a converter written in a hurry.

**`BigInt` instead of `parseInt`.** `parseInt(v, 2)` stops at the first digit
outside the alphabet and returns what it read so far: `"19"` became `1`, a
wrong answer with no warning. Past `Number.MAX_SAFE_INTEGER` the conversion
lost precision, and long inputs became the string `"Infinity"`, because
`isNaN(Infinity)` is `false`. All four cases are pinned by tests.

**Derived result, not state.** The converted value is computed during render
from the input and the mode. There is no `useState` or `useEffect` for it,
which structurally removes both the effect that ignored mode changes and the
one-frame stale result. React Compiler memoizes the derivation.

**Depth in CSS variables.** The shadows are arbitrary values with hardcoded
colors, which no `dark:` variant could reach legibly. Keeping the colors in
variables redefined under `.dark` means switching themes also switches the
depth, not just background and text.

**Shared content width.** `--content-max` is used by the field row, the table
and the panel. The row is a `1fr auto 1fr` grid, so it occupies the defined
width instead of deriving it from the sum of its children — which is how the
two blocks had drifted 30px apart.

**Icons from two sources.** [Lucide](https://lucide.dev/) for UI and
[Simple Icons](https://simpleicons.org/) for brands, because Lucide 1.x
dropped every brand icon. LinkedIn is hand-drawn: Simple Icons removed it at
the trademark holder's request.

## Stack

| | | |
|---|---|---|
| [React](https://react.dev/) | 19 | UI |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0 | Automatic memoization |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Types, strict mode |
| [Vite](https://vite.dev/) | 6.4 | Build and dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Styling, configured in CSS |
| [Vitest](https://vitest.dev/) | 4.1 | Tests |
| [Bun](https://bun.sh/) | 1.2 | Package manager |

## Running

```bash
git clone https://github.com/dev-kohako/BinTwoDec.git
cd BinTwoDec
bun install
bun dev
```

Served at `http://localhost:5173`. Works the same with `npm`, but the
committed lockfile is Bun's.

## Scripts

| | |
|---|---|
| `bun dev` | Dev server with HMR |
| `bun run build` | Type check and production build into `dist/` |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | ESLint, including the React Compiler rules |
| `bun test` | Test suite |
| `bun run test:watch` | Tests in watch mode |

## Tests

The conversion logic lives isolated in `src/lib/conversion.ts`, free of React,
and that is where the tests focus. They run in a node environment, no DOM.

```bash
bun test
```

There is a regression block covering the four defects the conversion once
had. The suite was checked against the old `parseInt` implementation: the
tests meant to catch each case do fail, which proves they are not vacuous.
The round-trip uses a fixed-seed generator rather than `Math.random`, so a
failure stays reproducible.

## Structure

```
src/
├── components/     UI, one file per component
├── hooks/          use-theme (theme) and use-tilt (3D tilt)
├── lib/            conversion.ts and conversion.test.ts
├── types/          shared types
├── App.tsx
├── main.tsx
└── index.css       theme, depth variables and the .card-3d class
```

Tailwind 4 needs no `tailwind.config`: theme and variants live in
`src/index.css`, through `@theme` and `@custom-variant`.

## Deploy

Published on [Vercel](https://bin-two-dec.vercel.app/), rebuilt automatically
on every push to `main`.

| | |
|---|---|
| Framework | Vite |
| Build | `bun run build` |
| Output | `dist` |

## License

[MIT](LICENSE).

## Author

**Joseph Kawe** — [GitHub](https://github.com/dev-kohako) ·
[LinkedIn](https://www.linkedin.com/in/josephkawe/) ·
[Bento](https://bento.me/kohako)
