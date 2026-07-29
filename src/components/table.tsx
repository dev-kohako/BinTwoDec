const CONVERSIONS = [
  { id: 1, binary: "1010", decimal: 10 },
  { id: 2, binary: "1101", decimal: 13 },
  { id: 3, binary: "1110", decimal: 14 },
  { id: 4, binary: "1001", decimal: 9 },
  { id: 5, binary: "1111", decimal: 15 },
];

export const Table = () => {
  return (
    <div className="w-full max-w-[585px] overflow-hidden rounded-xl shadow-[var(--card-shadow)] transition-shadow duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light text-zinc-800 transition-colors duration-300 dark:text-zinc-200">
          <caption className="sr-only">
            Exemplos de conversão entre binário e decimal
          </caption>
          <thead className="border-b border-zinc-950/10 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-3 py-4 sm:px-6">
                #
              </th>
              <th scope="col" className="px-3 py-4 sm:px-6">
                Binário
              </th>
              <th scope="col" className="px-3 py-4 sm:px-6">
                Decimal
              </th>
              <th scope="col" className="px-3 py-4 sm:px-6">
                Conversão
              </th>
            </tr>
          </thead>
          <tbody>
            {CONVERSIONS.map(({ id, binary, decimal }) => (
              <tr
                key={id}
                className="border-b border-zinc-950/10 last:border-0 dark:border-white/10"
              >
                <th
                  scope="row"
                  className="px-3 py-4 font-medium whitespace-nowrap sm:px-6"
                >
                  {id}
                </th>
                <td className="px-3 py-4 font-mono whitespace-nowrap sm:px-6">
                  {binary}
                </td>
                <td className="px-3 py-4 font-mono whitespace-nowrap sm:px-6">
                  {decimal}
                </td>
                <td className="px-3 py-4 font-mono whitespace-nowrap sm:px-6">
                  {binary} → {decimal} / {decimal} → {binary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
