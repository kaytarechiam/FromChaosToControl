"use client";

import { useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import MultiSelectChips from "@/components/ui/MultiSelectChips";
import { KEKUATAN_OPTIONS, KETERBATASAN_OPTIONS } from "@/lib/missionData";
import { validateChaosProfile } from "@/lib/validation";

export default function ChaosProfile({ mission, value, onChange, onBack, onNext }) {
  const [error, setError] = useState(null);

  function set(field, val) {
    onChange({ ...value, [field]: val });
  }

  function handleNext() {
    const err = validateChaosProfile(value);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <TerminalFrame title="chaos_profile.cfg">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Chaos Profile</h2>
      <p className="mb-5 text-sm text-slate-400">
        Chaos Boss kamu:{" "}
        <span className="text-console-accent">{mission?.chaosBoss?.name}</span>. Sekarang
        petakan kekuatan dan keterbatasan dirimu sendiri.
      </p>

      <Warning>{error}</Warning>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Pilih 2 kekuatan diri
          </label>
          <MultiSelectChips
            options={KEKUATAN_OPTIONS}
            selected={value.kekuatan}
            onChange={(v) => set("kekuatan", v)}
            max={2}
            customPlaceholder="kekuatan versi kamu sendiri..."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Pilih 2 keterbatasan diri
          </label>
          <MultiSelectChips
            options={KETERBATASAN_OPTIONS}
            selected={value.keterbatasan}
            onChange={(v) => set("keterbatasan", v)}
            max={2}
            customPlaceholder="keterbatasan versi kamu sendiri..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Situasi yang paling sering bikin chaos
          </label>
          <textarea
            value={value.situasi}
            onChange={(e) => set("situasi", e.target.value)}
            rows={2}
            placeholder="Contoh: pas ada 3 deadline numpuk di hari yang sama"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Kebiasaan yang ingin dikontrol
          </label>
          <textarea
            value={value.kebiasaan}
            onChange={(e) => set("kebiasaan", e.target.value)}
            rows={2}
            placeholder="Contoh: buka HP terus tiap kerjain tugas"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Simpan &amp; Lanjut ke Control Plan</Button>
      </div>
    </TerminalFrame>
  );
}
