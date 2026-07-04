import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";

function ResultCard({ label, name, desc }) {
  return (
    <div className="rounded-lg border border-console-border bg-black/20 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-slate-50">{name}</p>
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
    </div>
  );
}

export default function MissionResult({ identity, mission, onBack, onNext }) {
  if (!mission) return null;
  const { chaosBoss, controlMove, modifier } = mission;

  return (
    <TerminalFrame title="mission_result.log">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Mission Result</h2>
      <p className="mb-5 text-sm text-slate-400">
        Mission objective: susun rencana pengelolaan diri yang sesuai dengan
        kekuatan dan keterbatasanmu, lalu terapkan dalam kehidupan nyata.
      </p>

      <div className="mb-5 grid gap-3 rounded-lg border border-console-border/60 bg-black/10 p-4 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Nama</p>
          <p className="text-sm text-slate-200">{identity.nama}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">NIM</p>
          <p className="text-sm text-slate-200">{identity.nim}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">KLAN</p>
          <p className="text-sm text-slate-200">{identity.klan}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ResultCard label="Your Chaos Boss" name={chaosBoss.name} desc={chaosBoss.desc} />
        <ResultCard label="Your Control Move" name={controlMove.name} desc={controlMove.instruction} />
        <ResultCard label="Your Mission Modifier" name={modifier.name} desc={modifier.desc} />
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Lanjut ke Chaos Profile</Button>
      </div>
    </TerminalFrame>
  );
}
