<div align="center">

<img src="./public/favicon.svg" width="76" height="76" alt="" />

# Bin2Dec

**Binário ↔ decimal. Sem limite de tamanho, sem arredondar.**

[![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React_Compiler-1.0-087EA4?style=flat-square)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Ver funcionando**](https://bin-two-dec.vercel.app/) · [English](README.en.md)

</div>

---

## Em resumo

Você digita um número, ele devolve na outra base. Decimal → binário, binário →
decimal, e o campo só aceita o que faz sentido no modo em que está — nada de
deixar você digitar `7` no binário e fingir que deu certo.

A parte de que eu não quis abrir mão: **não tem teto**. Cola um número de 300
dígitos e a resposta sai cravada, sem arredondamento simpático no meio. E se o
resultado não couber no campo, abre um painel com o número inteiro agrupado e a
soma de potências de 2 que chega até ele.

A interface é toda em português, de propósito.

## O visual

Tema claro e escuro, com a sua escolha guardada e aplicada antes do primeiro
paint — sem aquele flash branco na hora de carregar. Os cards têm relevo de
verdade e inclinam acompanhando o cursor; no toque isso não faz sentido, então
some, e quem pediu `prefers-reduced-motion` não vê nada se mexendo.

<!-- Para exibir as capturas, coloque os dois arquivos em public/ e troque
     este comentário pelo bloco abaixo:

| Claro | Escuro |
|:-----:|:------:|
| <img src="./public/screenshot-light.png" alt="Tema claro" /> | <img src="./public/screenshot-dark.png" alt="Tema escuro" /> |
-->

## Por dentro

Quatro escolhas que eu faria de novo.

**`BigInt` do começo ao fim.** É o que garante que 64 bits ligados voltem
`18446744073709551615` cravado. Com número comum, os últimos dígitos viram
enfeite. A validação da entrada acompanha o modo, então binário aceita `0` e
`1` e mais nada.

**O resultado é derivado, não é estado.** Ele sai de uma conta no render, a
partir da entrada e do modo. Sem `useState`, sem `useEffect`. Um estado a menos
para manter sincronizado é um bug a menos para caçar depois — e o React
Compiler memoiza a conta sozinho.

**O tema alcança o relevo.** Trocar de tema aqui não muda só fundo e texto: as
cores das sombras moram em variáveis CSS redefinidas em `.dark`, então o relevo
dos cards troca junto. Um `box-shadow` de valor arbitrário nenhuma variante
`dark:` consegue alcançar.

**Uma largura, três blocos.** `--content-max` manda na linha de campos, na
tabela e no painel. A linha é uma grade `1fr auto 1fr`, então ela ocupa essa
largura em vez de deduzir da soma dos filhos — que é como as bordas de dois
blocos deixam de bater sem ninguém perceber.

## Com o que foi feito

| | | |
|---|---|---|
| [React](https://react.dev/) | 19 | Interface |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0 | Memoização automática |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Tipagem, modo estrito |
| [Vite](https://vite.dev/) | 6.4 | Build e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Estilo, configurado em CSS |
| [Vitest](https://vitest.dev/) | 4.1 | Testes |
| [Bun](https://bun.sh/) | 1.2 | Gerenciador de pacotes |

## Rodando na sua máquina

```bash
git clone https://github.com/dev-kohako/BinTwoDec.git
cd BinTwoDec
bun install
bun dev
```

Abre em `http://localhost:5173`. Funciona igual com `npm` — só saiba que o
lockfile versionado aqui é o do Bun.

## Scripts

| | |
|---|---|
| `bun dev` | Dev server com HMR |
| `bun run build` | Type check e build de produção em `dist/` |
| `bun run preview` | Serve o build localmente |
| `bun run lint` | ESLint, com as regras do React Compiler |
| `bun test` | Roda os testes |
| `bun run test:watch` | Testes em modo watch |

## Testes

A conta de conversão mora sozinha em `src/lib/conversion.ts`, sem React
nenhum, e é ali que os testes batem. Rodam em node, sem DOM, e terminam antes
de você tirar a mão do teclado.

```bash
bun test
```

O que está fixado são os cantos onde esse tipo de código costuma escorregar:
dígito fora do alfabeto no modo binário, valores acima de
`Number.MAX_SAFE_INTEGER`, entrada gigante, entrada vazia e zeros à esquerda. O
round-trip usa gerador com semente fixa em vez de `Math.random`, senão uma
falha aparece hoje e desaparece amanhã.

## Onde fica o quê

```
src/
├── components/     interface, um arquivo por componente
├── hooks/          use-theme (tema) e use-tilt (inclinação 3D)
├── lib/            conversion.ts e conversion.test.ts
├── types/          tipos compartilhados
├── App.tsx
├── main.tsx
└── index.css       tema, variáveis de relevo e a classe .card-3d
```

Se você veio pelo código e quer ver só uma coisa, veja
[`src/lib/conversion.ts`](src/lib/conversion.ts). É o coração e não passa de
cem linhas.

O Tailwind 4 dispensa `tailwind.config`: tema e variantes ficam em
`src/index.css`, com `@theme` e `@custom-variant`.

## Deploy

Está na [Vercel](https://bin-two-dec.vercel.app/), rebuildando a cada push na
`main`.

| | |
|---|---|
| Framework | Vite |
| Build | `bun run build` |
| Saída | `dist` |

## Licença

[MIT](LICENSE) — pega, usa, modifica. Se te ajudou, me conta.

## Quem fez

**Joseph Kawe**, sob a marca KWK.

[GitHub](https://github.com/dev-kohako) ·
[LinkedIn](https://www.linkedin.com/in/josephkawe/) ·
[Instagram](https://www.instagram.com/kohako.dev/) ·
[YouTube](https://www.youtube.com/@dev_kohako) ·
[Bento](https://bento.me/kohako)
