"use client";

import { useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import { validateControlPlan } from "@/lib/validation";

export default function ControlPlan({ mission, chaosProfile, value, onChange, onBack, onNext }) {
  const [error, setError] = useState(null);

  function set(field, val) {
    onChange({ ...value, [field]: val });
  }

  function handleNext() {
    const err = validateControlPlan(value);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <TerminalFrame title="control_plan.cfg">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Control Plan</h2>
      <p className="mb-5 text-sm text-slate-400">
        Hubungkan Chaos Boss, kekuatan, keterbatasan, dan Control Move kamu jadi
        satu rencana yang bisa langsung dijalankan.
      </p>

      <Warning>{error}</Warning>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Kekuatan yang akan aku pakai
          </label>
          <select
            value={value.kekuatanDipakai}
            onChange={(e) => set("kekuatanDipakai", e.target.value)}
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          >
            <option value="">Pilih kekuatan dari Chaos Profile</option>
            {chaosProfile.kekuatan.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Keterbatasan yang akan aku antisipasi
          </label>
          <select
            value={value.keterbatasanAntisipasi}
            onChange={(e) => set("keterbatasanAntisipasi", e.target.value)}
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          >
            <option value="">Pilih keterbatasan dari Chaos Profile</option>
            {chaosProfile.keterbatasan.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Rencana penerapan Control Move ({mission?.controlMove?.name})
          </label>
          <textarea
            value={value.rencana}
            onChange={(e) => set("rencana", e.target.value)}
            rows={2}
            placeholder={`Contoh: aku akan ${mission?.controlMove?.instruction || "menerapkan control move ini"} setiap sebelum mulai tugas`}
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Waktu atau situasi penerapan
          </label>
          <input
            type="text"
            value={value.waktu}
            onChange={(e) => set("waktu", e.target.value)}
            placeholder="Contoh: tiap malam jam 8, sebelum mulai belajar"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Backup plan jika gagal
          </label>
          <textarea
            value={value.backup}
            onChange={(e) => set("backup", e.target.value)}
            rows={2}
            placeholder="Contoh: kalau kelewat, aku akan restart rencana besoknya pagi-pagi"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>
      </div>

      {(value.kekuatanDipakai || value.rencana) && (
        <div className="mt-6 rounded-lg border border-console-border/60 bg-black/20 p-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
            Preview Control Plan
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            Melawan <span className="text-console-accent">{mission?.chaosBoss?.name}</span>, aku
            akan mengandalkan{" "}
            <span className="text-slate-100">{value.kekuatanDipakai || "..."}</span> sambil
            mengantisipasi{" "}
            <span className="text-slate-100">{value.keterbatasanAntisipasi || "..."}</span>.
            Lewat {mission?.controlMove?.name}, {value.rencana || "..."}
            {value.waktu ? `, dilakukan pada ${value.waktu}` : ""}. Kalau gagal:{" "}
            {value.backup || "..."}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Simpan &amp; Lanjut ke Daily Tracker</Button>
      </div>
    </TerminalFrame>
  );
}
