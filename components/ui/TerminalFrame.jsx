export default function TerminalFrame({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-console-border bg-console-panel/80 shadow-glow backdrop-blur-sm ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-console-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-console-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-console-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-console-accent/70" />
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-console-accent/80">
            {title}
          </span>
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
