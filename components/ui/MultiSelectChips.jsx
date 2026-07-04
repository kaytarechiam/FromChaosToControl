"use client";

import { useState } from "react";

export default function MultiSelectChips({ options, selected, onChange, max = 2, customPlaceholder }) {
  const [custom, setCustom] = useState("");
  const [notice, setNotice] = useState("");

  function toggle(option) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
      setNotice("");
      return;
    }
    if (selected.length >= max) {
      setNotice(`Maksimal pilih ${max} ya.`);
      return;
    }
    setNotice("");
    onChange([...selected, option]);
  }

  function addCustom() {
    const val = custom.trim();
    if (!val) return;
    if (selected.length >= max) {
      setNotice(`Maksimal pilih ${max} ya. Hapus salah satu dulu kalau mau ganti.`);
      return;
    }
    if (selected.includes(val)) {
      setNotice("Itu sudah kamu pilih.");
      return;
    }
    setNotice("");
    onChange([...selected, val]);
    setCustom("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? "border-console-accent bg-console-accent/15 text-console-accent"
                  : "border-console-border text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder={customPlaceholder || "atau tulis versi kamu sendiri..."}
          className="flex-1 rounded-lg border border-console-border bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-console-accent"
        />
        <button
          type="button"
          onClick={addCustom}
          className="rounded-lg border border-console-border px-3 py-2 text-xs text-slate-300 hover:border-console-accent hover:text-console-accent"
        >
          Tambah
        </button>
      </div>

      {notice && <p className="mt-1.5 text-xs text-console-warn">{notice}</p>}

      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 rounded-full bg-console-accent/10 px-3 py-1 text-xs text-console-accent"
            >
              {s}
              <button type="button" onClick={() => onChange(selected.filter((x) => x !== s))}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
