<div align="center">

<img src="./public/favicon.svg" width="76" height="76" alt="" />

# Bin2Dec

**Conversor binário ↔ decimal sem limite de precisão.**

[![React](https://img.shields.io/badge/React-19-087EA4?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![React Compiler](https://img.shields.io/badge/React_Compiler-1.0-087EA4?style=flat-square)](https://react.dev/learn/react-compiler)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Ver funcionando**](https://bin-two-dec.vercel.app/) · [English](README.en.md)

</div>

---

## O que é

Converte números entre base 2 e base 10 nos dois sentidos, com validação de
entrada dependente do modo e precisão arbitrária: `1111111111111111111111111111111111111111111111111111111111111111`
devolve `18446744073709551615`, exato, e não um arredondamento.

Quando o resultado não cabe no campo, um painel mostra o número inteiro
agrupado e a expansão em potências de 2 que chega até ele.

## Interface

Tema claro e escuro, escolha persistida e aplicada antes do primeiro paint.
Cards com relevo e inclinação seguindo o cursor, desligada em toque e sob
`prefers-reduced-motion`.

<!-- Para exibir as capturas, coloque os dois arquivos em public/ e troque
     este comentário pelo bloco abaixo:

| Claro | Escuro |
|:-----:|:------:|
| <img src="./public/screenshot-light.png" alt="Tema claro" /> | <img src="./public/screenshot-dark.png" alt="Tema escuro" /> |
-->

## Como foi construído

**Precisão com `BigInt`.** Toda conversão passa por `BigInt`, então não existe
teto de tamanho nem arredondamento: 64 bits ligados devolvem
`18446744073709551615` exato. A validação da entrada acompanha o modo, então
o modo binário aceita apenas `0` e `1`.

**Resultado derivado, não estado.** O valor convertido é calculado no render a
partir da entrada e do modo, sem `useState` nem `useEffect` próprios. Um
estado a menos para manter em sincronia, e o React Compiler memoiza a
derivação.

**O tema alcança o relevo.** As cores das sombras vivem em variáveis CSS
redefinidas em `.dark`, então trocar de tema muda também o relevo dos cards, e
não só fundo e texto — um `box-shadow` de valor arbitrário não é alcançável
por variante `dark:`.

**Largura de conteúdo compartilhada.** `--content-max` define a largura e é
usada pela linha de campos, pela tabela e pelo painel. A linha é uma grade
`1fr auto 1fr`, então ocupa essa largura em vez de deduzi-la da soma dos
filhos.

**Ícones de duas fontes.** [Lucide](https://lucide.dev/) para interface e
[Simple Icons](https://simpleicons.org/) para as marcas, porque o Lucide 1.x
removeu todos os ícones de marca. A LinkedIn é desenhada à mão: o Simple
Icons a removeu por pedido de titular.

## Stack

| | | |
|---|---|---|
| [React](https://react.dev/) | 19 | Interface |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0 | Memoização automática |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Tipagem, modo estrito |
| [Vite](https://vite.dev/) | 6.4 | Build e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3 | Estilo, configurado em CSS |
| [Vitest](https://vitest.dev/) | 4.1 | Testes |
| [Bun](https://bun.sh/) | 1.2 | Gerenciador de pacotes |

## Rodando

```bash
git clone https://github.com/dev-kohako/BinTwoDec.git
cd BinTwoDec
bun install
bun dev
```

Disponível em `http://localhost:5173`. Funciona igual com `npm`, mas o
lockfile versionado é o do Bun.

## Scripts

| | |
|---|---|
| `bun dev` | Dev server com HMR |
| `bun run build` | Type check e build de produção em `dist/` |
| `bun run preview` | Serve o build localmente |
| `bun run lint` | ESLint, incluindo as regras do React Compiler |
| `bun test` | Suíte de testes |
| `bun run test:watch` | Testes em modo watch |

## Testes

A lógica de conversão vive isolada em `src/lib/conversion.ts`, sem React, e é
onde os testes se concentram. Rodam em ambiente node, sem DOM.

```bash
bun test
```

Os casos-limite estão fixados: dígito fora do alfabeto no modo binário,
valores acima de `Number.MAX_SAFE_INTEGER`, entradas muito longas, entrada
vazia e zeros à esquerda. O round-trip usa gerador com semente fixa, e não
`Math.random`, para que uma falha continue reproduzível na execução seguinte.

## Estrutura

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

O Tailwind 4 dispensa `tailwind.config`: tema e variantes ficam em
`src/index.css`, via `@theme` e `@custom-variant`.

## Deploy

Publicado na [Vercel](https://bin-two-dec.vercel.app/), com build automático
a cada push na `main`.

| | |
|---|---|
| Framework | Vite |
| Build | `bun run build` |
| Saída | `dist` |

## Licença

[MIT](LICENSE).

## Autor

**Joseph Kawe** — [GitHub](https://github.com/dev-kohako) ·
[LinkedIn](https://www.linkedin.com/in/josephkawe/) ·
[Bento](https://bento.me/kohako)
