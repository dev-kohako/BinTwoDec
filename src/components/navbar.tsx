export const Navbar = () => {
  return (
    <footer className="bg-zinc-200 border-b border-zinc-950/10 shadow-[0px_-3px_12px_-8px_rgba(0,_0,_0,_1)] text-center py-2 z-50 fixed top-0 w-full flex justify-center items-center font-poppins">
      <div className="items-center justify-between max-w-[1024px] container flex-grow flex md:items-center mx-6">
        <a href="" className="text-center font-medium flex gap-x-1 cursor-pointer">
          <img className="invert w-3 object-contain mb-0.5" src="/KWK.png" alt="Logo" />
          KWK
        </a>
        <div className="flex justify-center items-center space-x-2 font-medium">
            Bin2Dec
        </div>
      </div>
    </footer>
  )
}