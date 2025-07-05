import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Table } from "./components/table";
import { Notification } from "./components/notification";

function App() {
  const [number, setNumber] = useState<string>("");
  const [mode, setMode] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      setNumber(newValue);
      setShowNotification(false);
    } else {
      if (!showNotification) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    }
  };

  const convertNumber = () => {
    if (!mode) {
      const binary = parseInt(number, 10).toString(2);
      setResult(isNaN(parseInt(number, 10)) ? "Inválido" : binary);
    } else {
      const decimal = parseInt(number, 2);
      setResult(isNaN(decimal) ? "Inválido" : decimal.toString());
    }
  };

  useEffect(() => {
    convertNumber();
  }, [number]);

  return (
    <>
      <Navbar />
      <Notification text="Apenas números" active={showNotification} />
      <main className="flex flex-col items-center justify-center w-full h-auto sm:h-screen bg-zinc-200 gap-y-10 font-poppins pt-[5rem] pb-[7rem] px-[10%]">
        <div className="flex flex-col items-center justify-center gap-y-5 md:flex-row md:gap-x-5">
          <div className="flex flex-col items-center justify-center w-[15em] h-[7.5em] bg-zinc-200 rounded-xl drop-shadow-xl shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff]">
            <h1 className="text-lg font-medium mb-1">
              {mode ? "Binário" : "Decimal"}
            </h1>
            <input
              className="p-1 text-center border border-zinc-900 rounded-2xl px-2 outline-zinc-900"
              value={number}
              onChange={handleChange}
              type="text"
              inputMode="numeric"
              placeholder={mode ? "Digite binário (0 ou 1)" : "Digite decimal"}
            />
          </div>

          <button
            onClick={() => {
              setMode((prev) => !prev);
              setNumber("");
              setResult("");
            }}
            className="px-2 py-1 rounded-xl border-2 border-zinc-200 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700"
          >
            Trocar
          </button>

          <div className="flex flex-col items-center justify-center w-[15em] h-[7.5em] bg-zinc-200 rounded-xl drop-shadow-xl shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff]">
            <h1 className="text-lg font-medium mb-1">
              {mode ? "Decimal" : "Binário"}
            </h1>
            <input
              className="p-1 text-center border border-zinc-900 rounded-2xl px-2"
              value={result}
              type="text"
              disabled
            />
          </div>
        </div>
        <Table />
      </main>
      <Footer />
    </>
  );
}

export default App;
