"use client";

import { useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import ChipSelect from "@/components/ui/ChipSelect";
import { validateControlPlan } from "@/lib/validation";

const WAKTU_OPTIONS = [
  "pagi",
  "siang",
  "sore",
  "malam",
  "sebelum mulai tugas",
  "setelah kelas",
  "sebelum tidur",
  "sebelum deadline",
];

const BACKUP_OPTIONS = [
  "restart besok pagi",
  "pecah tugas jadi 10 menit",
  "minta buddy checkpoint",
  "jauhkan HP dari meja",
  "tulis ulang 3 prioritas",
  "mulai dari bagian termudah",
];

export default function BattleStrategy({ mission, chaosProfile, value, onChange, onBack, onNext }) {
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
    <TerminalFrame title="battle_strategy.cfg">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Battle Strategy</h2>
      <p className="mb-5 text-sm text-slate-400">
        Susun strategi buat lawan Chaos Boss kamu, hubungkan kekuatan, keterbatasan, dan Control
        Move jadi satu rencana yang bisa langsung dijalankan.
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
            <option value="">Pilih kekuatan dari System Scan</option>
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
            <option value="">Pilih keterbatasan dari System Scan</option>
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
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Waktu atau situasi penerapan
          </label>
          <ChipSelect
            options={WAKTU_OPTIONS}
            value={value.waktu}
            onChange={(v) => set("waktu", v)}
            customPlaceholder="waktu versi kamu sendiri..."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Backup plan jika gagal
          </label>
          <ChipSelect
            options={BACKUP_OPTIONS}
            value={value.backup}
            onChange={(v) => set("backup", v)}
            customPlaceholder="backup plan versi kamu sendiri..."
          />
        </div>
      </div>

      {(value.kekuatanDipakai || value.rencana) && (
        <div className="mt-6 rounded-lg border border-console-border/60 bg-black/20 p-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
            Preview Battle Strategy
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
        <Button onClick={handleNext}>Simpan &amp; Lanjut ke Battle Log</Button>
      </div>
    </TerminalFrame>
  );
}
