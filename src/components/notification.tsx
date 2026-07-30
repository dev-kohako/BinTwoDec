interface NotificationProps {
  text: string;
  active: boolean;
}

export const Notification = ({ text, active }: NotificationProps) => {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Sobrepõe o conteúdo, então no escuro precisa de um tom acima da
          superfície comum, que ali é igual ao fundo da página. */}
      <div
        className="absolute top-5 right-4 left-4 ml-auto flex max-w-xs items-center rounded-lg bg-[var(--card-surface)] p-4 text-zinc-600 shadow-[var(--card-shadow)] transition-colors duration-300 dark:bg-zinc-800 dark:text-zinc-300"
        role="alert"
      >
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 transition-colors duration-300 dark:bg-orange-500/20 dark:text-orange-300">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
      </div>
    </div>
  );
};
