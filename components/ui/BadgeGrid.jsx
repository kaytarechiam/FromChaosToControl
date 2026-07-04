export default function BadgeGrid({ achievements }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {achievements.map((a) => (
        <div
          key={a.id}
          className={`rounded-lg border p-3 text-center transition-colors ${
            a.earned
              ? "border-console-accent bg-console-accent/10"
              : "border-console-border/40 opacity-40"
          }`}
        >
          <p className={`text-xs font-bold ${a.earned ? "text-console-accent" : "text-slate-400"}`}>
            {a.name}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-slate-400">{a.desc}</p>
        </div>
      ))}
    </div>
  );
}
