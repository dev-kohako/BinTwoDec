export const Table = () => {
    const conversions = [
      { id: 1, binary: '1010', decimal: 10 },
      { id: 2, binary: '1101', decimal: 13 },
      { id: 3, binary: '1110', decimal: 14 },
      { id: 4, binary: '1001', decimal: 9 },
      { id: 5, binary: '1111', decimal: 15 },
    ];
  
    return (
      <div className="flex flex-col w-full max-w-[585px] rounded-xl shadow-[6px_6px_26px_#9b9b9d,-6px_-6px_26px_#ffffff]">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Binário</th>
                    <th scope="col" className="px-6 py-4">Decimal</th>
                    <th scope="col" className="px-6 py-4">Conversão</th>
                  </tr>
                </thead>
                <tbody>
                  {conversions.map(({ id, binary, decimal }) => (
                    <tr key={id} className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{binary}</td>
                      <td className="whitespace-nowrap px-6 py-4">{decimal}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {binary} → {decimal} / {decimal} → {binary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  