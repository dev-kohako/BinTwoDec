export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-center border-b border-zinc-950/10 bg-zinc-200 py-2 text-center font-poppins shadow-[0px_3px_12px_-8px_rgba(0,_0,_0,_1)]">
      <nav className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className="flex items-center gap-x-1 rounded font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          <img className="mb-0.5 w-3 object-contain invert" src="/KWK.png" alt="" />
          KWK
        </a>
        <p className="font-medium">Bin2Dec</p>
      </nav>
    </header>
  );
};
