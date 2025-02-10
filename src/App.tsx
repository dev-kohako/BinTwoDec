import { useState } from "react";

function App() {
  const [number, setNumber] = useState<string>(""); // Número inserido pelo usuário
  const [mode, setMode] = useState<boolean>(false); // Modo de conversão (Decimal → Binário ou Binário → Decimal)
  const [result, setResult] = useState<string>(""); // Resultado da conversão

  const convertNumber = () => {
    if (!mode) {
      // Converte Decimal para Binário
      const binary = parseInt(number, 10).toString(2);
      setResult(isNaN(parseInt(number, 10)) ? "Inválido" : binary);
    } else {
      // Converte Binário para Decimal
      const decimal = parseInt(number, 2);
      setResult(isNaN(decimal) ? "Inválido" : decimal.toString());
    }
  };

  return (
    <main className="w-full h-screen bg-zinc-900 flex justify-center items-center gap-x-8">
      {/* Input Decimal */}
      <div className="bg-zinc-200 h-[7.5em] w-[15em] flex flex-col justify-center items-center">
        <h1>{mode ? "Binário" : "Decimal"}</h1>
        <input
          className="border border-zinc-900 p-1 text-center"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          placeholder={mode ? "Digite binário (0 ou 1)" : "Digite decimal"}
        />
        <button onClick={convertNumber}>Converter</button>
      </div>

      {/* Botão de troca de modo */}
      <button
        onClick={() => {
          setMode((prev) => !prev);
          setNumber(""); // Limpa os valores ao trocar
          setResult("");
        }}
        className="px-2 py-1 rounded-xl border-2 border-zinc-200 text-zinc-200"
      >
        Trocar
      </button>

      {/* Resultado da conversão */}
      <div className="bg-zinc-200 h-[7.5em] w-[15em] flex flex-col justify-center items-center">
        <h1>{mode ? "Decimal" : "Binário"}</h1>
        <input
          className="border border-zinc-900 p-1 text-center"
          value={result}
          type="text"
          disabled
        />
      </div>
    </main>
  );
}

export default App;
