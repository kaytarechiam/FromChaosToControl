"use client";

import { useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import { KLAN_OPTIONS } from "@/lib/missionData";

export default function IdentityInput({ initial, onBack, onSubmit, validateIdentity }) {
  const [identity, setIdentity] = useState(initial);
  const [error, setError] = useState(null);

  function handleChange(field, val) {
    setIdentity((s) => ({ ...s, [field]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validateIdentity(identity);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onSubmit({ ...identity, nim: identity.nim.trim() });
  }

  return (
    <TerminalFrame title="identity_input.sh">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Identity Input</h2>
      <p className="mb-5 text-sm text-slate-400">
        Isi identitas kamu dulu, sistem butuh ini buat generate misi personal.
      </p>

      <Warning>{error}</Warning>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Nama
          </label>
          <input
            type="text"
            value={identity.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
            placeholder="Nama lengkap kamu"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            NIM
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={identity.nim}
            onChange={(e) => handleChange("nim", e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Contoh: 1301230456"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            KLAN
          </label>
          <select
            value={identity.klan}
            onChange={(e) => handleChange("klan", e.target.value)}
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          >
            <option value="">Pilih KLAN kamu</option>
            {KLAN_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Generate Mission</Button>
        </div>
      </form>
    </TerminalFrame>
  );
}
