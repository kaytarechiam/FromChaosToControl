const STEP_LABELS = [
  "Landing",
  "Identity",
  "Mission",
  "Chaos Profile",
  "Control Plan",
  "Tracker",
  "Patch Note",
];

export default function StepNav({ current, maxUnlocked, onJump }) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-3xl items-center justify-between gap-1 overflow-x-auto px-1 font-mono text-[10px] sm:text-xs">
      {STEP_LABELS.map((label, i) => {
        const unlocked = i <= maxUnlocked;
        const active = i === current;
        return (
          <button
            key={label}
            disabled={!unlocked}
            onClick={() => onJump(i)}
            className={`group flex flex-1 flex-col items-center gap-1 whitespace-nowrap px-1 py-1 disabled:cursor-not-allowed`}
          >
            <span
              className={`h-1.5 w-full rounded-full transition-colors ${
                active
                  ? "bg-console-accent"
                  : unlocked
                  ? "bg-console-accent/40"
                  : "bg-console-border"
              }`}
            />
            <span
              className={`hidden uppercase tracking-wider sm:block ${
                active ? "text-console-accent" : unlocked ? "text-slate-400" : "text-slate-700"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
