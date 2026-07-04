export default function HpBar({ hp, label = "Boss HP" }) {
  const pct = Math.max(0, Math.min(100, hp));
  const barColor = pct <= 30 ? "bg-console-accent" : pct <= 70 ? "bg-console-warn" : "bg-console-danger";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-mono text-[10px] text-slate-400">{pct}/100</p>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-console-border bg-black/40">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
