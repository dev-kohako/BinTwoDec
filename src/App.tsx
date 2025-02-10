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
      <main className="w-full h-screen bg-zinc-200 flex flex-col gap-y-10 justify-center items-center font-poppins">
        <div className="flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-5">
          <div className="bg-zinc-200  h-[7.5em] w-[15em] flex flex-col justify-center items-center drop-shadow-xl rounded-xl shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff]">
            <h1 className="text-lg font-medium mb-1">
              {mode ? "Binário" : "Decimal"}
            </h1>
            <input
              className="border border-zinc-900 p-1 text-center rounded-2xl px-2 outline-zinc-900"
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

          <div className="bg-zinc-200  h-[7.5em] w-[15em] flex flex-col justify-center items-center drop-shadow-xl rounded-xl shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff]">
            <h1 className="text-lg font-medium mb-1">
              {mode ? "Decimal" : "Binário"}
            </h1>
            <input
              className="border border-zinc-900 p-1 text-center rounded-2xl px-2 "
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
