"use client";

import { useState } from "react";

export default function ChipSelect({ options, value, onChange, customPlaceholder }) {
  const isPresetValue = options.includes(value);
  const [customMode, setCustomMode] = useState(value !== "" && !isPresetValue);
  const [customText, setCustomText] = useState(!isPresetValue ? value : "");

  function selectPreset(opt) {
    setCustomMode(false);
    onChange(opt);
  }

  function selectCustom() {
    setCustomMode(true);
    onChange(customText);
  }

  function handleCustomChange(e) {
    const v = e.target.value;
    setCustomText(v);
    onChange(v);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = !customMode && value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => selectPreset(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs capitalize transition-colors ${
                active
                  ? "border-console-accent bg-console-accent/15 text-console-accent"
                  : "border-console-border text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {opt}
            </button>
          );
        })}
        <button
          type="button"
          onClick={selectCustom}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
            customMode
              ? "border-console-accent2 bg-console-accent2/15 text-console-accent2"
              : "border-console-border text-slate-400 hover:border-slate-500 hover:text-slate-200"
          }`}
        >
          custom
        </button>
      </div>

      {customMode && (
        <input
          type="text"
          value={customText}
          onChange={handleCustomChange}
          placeholder={customPlaceholder || "tulis versi kamu sendiri..."}
          className="mt-2 w-full rounded-lg border border-console-border bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:border-console-accent"
        />
      )}
    </div>
  );
}
