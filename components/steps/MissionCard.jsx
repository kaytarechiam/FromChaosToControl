"use client";

import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import { exportMissionCardJpg } from "@/lib/missionCardExport";

function IdentityLine({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function ResultCard({ label, name, desc }) {
  return (
    <div className="rounded-lg border border-console-border bg-black/20 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
        {label}
      </p>
      <p className="mt-1 break-words text-lg font-bold text-slate-50">{name}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-400">{desc}</p>
    </div>
  );
}

export default function MissionCard({ identity, mission, onBack, onReset }) {
  if (!mission) return null;
  const { chaosBoss, controlMove, modifier } = mission;

  function handleExport() {
    exportMissionCardJpg({ identity, mission });
  }

  return (
    <TerminalFrame title="mission_card.sys">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-console-accent2/80">
            System Recovery Console
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-50">Mission Card</h2>
        </div>
        <span className="self-start rounded-full border border-console-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-console-accent sm:self-auto">
          deterministic by NIM
        </span>
      </div>

      <div className="mb-5 grid gap-3 rounded-lg border border-console-border/60 bg-black/10 p-4 sm:grid-cols-3">
        <IdentityLine label="Nama" value={identity.nama} />
        <IdentityLine label="NIM TPB" value={identity.nim} />
        <IdentityLine label="KLAN" value={identity.klan} />
      </div>

      <div className="space-y-3">
        <ResultCard label="Chaos Boss" name={chaosBoss.name} desc={chaosBoss.desc} />
        <ResultCard label="Control Move" name={controlMove.name} desc={controlMove.instruction} />
        <ResultCard label="Mission Modifier" name={modifier.name} desc={modifier.desc} />
      </div>

      <p className="mt-5 rounded-lg border border-console-accent/25 bg-console-accent/5 p-4 text-sm leading-relaxed text-slate-300">
        Unduh Mission Card ini dalam bentuk JPG, lalu lampirkan pada file PDF tugas.
        Pengisian kondisi awal diri, rencana pengelolaan diri, catatan penerapan, dan
        refleksi akhir dilakukan pada lampiran pengerjaan.
      </p>

      <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onBack}>
            Edit Identitas
          </Button>
          <Button variant="ghost" onClick={onReset}>
            Reset
          </Button>
        </div>
        <Button onClick={handleExport} className="sm:min-w-36">
          Export JPG
        </Button>
      </div>
    </TerminalFrame>
  );
}
