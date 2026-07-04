const VARIANTS = {
  primary:
    "bg-console-accent text-console-bg hover:bg-console-accent/90 shadow-glowSm font-semibold",
  secondary:
    "border border-console-border text-slate-200 hover:border-console-accent2/60 hover:text-console-accent2",
  ghost: "text-slate-400 hover:text-slate-200",
  danger:
    "border border-console-danger/50 text-console-danger hover:bg-console-danger/10",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-lg px-4 py-2.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
