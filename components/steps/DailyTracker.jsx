"use client";

import { useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import { validateTrackerHasEntry } from "@/lib/validation";
import { compressImageFile } from "@/lib/imageUtils";

function LevelPicker(props) {
  const { label, value, onChange } = props;
  return (
    <div>
      <p className="mb-1.5 text-xs text-slate-400">{label}</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`h-8 w-8 rounded-md border text-xs font-mono transition-colors ${
              value === n
                ? "border-console-accent bg-console-accent/20 text-console-accent"
                : "border-console-border text-slate-500 hover:border-slate-500"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoUpload({ photo, onPhoto, onRemove }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa foto/gambar ya.");
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      const dataUrl = await compressImageFile(file);
      onPhoto(dataUrl);
    } catch (err) {
      setError(err.message || "Gagal memproses foto.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block text-xs text-slate-400">Foto bukti pengerjaan</label>

      {photo ? (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt="Bukti pengerjaan"
            className="h-28 w-28 rounded-lg border border-console-border object-cover"
          />
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer rounded-lg border border-console-border px-3 py-1.5 text-xs text-slate-300 hover:border-console-accent hover:text-console-accent">
              Ganti Foto
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg border border-console-danger/40 px-3 py-1.5 text-xs text-console-danger hover:bg-console-danger/10"
            >
              Hapus Foto
            </button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-console-border px-4 py-6 text-xs text-slate-400 hover:border-console-accent hover:text-console-accent">
          {processing ? "Memproses foto..." : "Tap untuk upload foto bukti pengerjaan"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={processing}
          />
        </label>
      )}

      {error && <p className="mt-1.5 text-xs text-console-warn">{error}</p>}
    </div>
  );
}

function DayCard({ day, onChange }) {
  function set(field, val) {
    onChange({ ...day, [field]: val });
  }

  return (
    <div className="rounded-lg border border-console-border/60 bg-black/20 p-4">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-console-accent2/80">
        Hari ke-{day.day}
      </p>

      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-xs text-slate-400">Apakah rencana dicoba hari ini?</p>
          <div className="flex gap-2">
            {["ya", "tidak"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => set("tried", opt)}
                className={`rounded-full border px-4 py-1.5 text-xs capitalize transition-colors ${
                  day.tried === opt
                    ? "border-console-accent bg-console-accent/15 text-console-accent"
                    : "border-console-border text-slate-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <LevelPicker
            label="Chaos level (1-5)"
            value={day.chaosLevel}
            onChange={(v) => set("chaosLevel", v)}
          />
          <LevelPicker
            label="Energy level (1-5)"
            value={day.energyLevel}
            onChange={(v) => set("energyLevel", v)}
          />
        </div>

        <PhotoUpload
          photo={day.evidencePhoto}
          onPhoto={(dataUrl) => set("evidencePhoto", dataUrl)}
          onRemove={() => set("evidencePhoto", "")}
        />

        <div>
          <label className="mb-1 block text-xs text-slate-400">Catatan singkat (opsional)</label>
          <textarea
            value={day.evidence}
            onChange={(e) => set("evidence", e.target.value)}
            rows={2}
            placeholder="Contoh: submit tugas X, checklist harian selesai, chat buddy checkpoint, dll."
            className="w-full rounded-lg border border-console-border bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-400">Catatan berhasil / gagal</label>
          <textarea
            value={day.note}
            onChange={(e) => set("note", e.target.value)}
            rows={2}
            placeholder="Apa yang kerasa berhasil, apa yang masih bikin chaos?"
            className="w-full rounded-lg border border-console-border bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>
      </div>
    </div>
  );
}

export default function DailyTracker({ tracker, onChange, onBack, onNext }) {
  const [error, setError] = useState(null);

  function updateDay(index, updatedDay) {
    const next = tracker.map((d, i) => (i === index ? updatedDay : d));
    onChange(next);
  }

  function handleNext() {
    const err = validateTrackerHasEntry(tracker);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <TerminalFrame title={`daily_tracker.log [${tracker.length}d]`}>
      <h2 className="mb-1 text-xl font-bold text-slate-50">Daily Tracker</h2>
      <p className="mb-5 text-sm text-slate-400">
        Catat penerapan rencana kamu selama {tracker.length} hari ke depan.
      </p>

      <Warning>{error}</Warning>

      <div className="space-y-4">
        {tracker.map((day, i) => (
          <DayCard key={day.day} day={day} onChange={(d) => updateDay(i, d)} />
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Lanjut ke Patch Note</Button>
      </div>
    </TerminalFrame>
  );
}
