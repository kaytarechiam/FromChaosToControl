"use client";

import { useMemo, useState } from "react";
import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";
import Warning from "@/components/ui/Warning";
import { buildPatchNoteText } from "@/lib/patchNote";
import { exportStateAsJson, parseImportedJson } from "@/lib/storage";
import { generatePatchNotePdf } from "@/lib/pdfExport";

export default function PatchNote({ state, onChangePatchNote, onBack, onReset, onImport }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [exportStatus, setExportStatus] = useState("");
  const [pdfStatus, setPdfStatus] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [importText, setImportText] = useState("");
  const [importOpen, setImportOpen] = useState(false);
  const [importError, setImportError] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  const patchText = useMemo(() => buildPatchNoteText(state), [state]);
  const photoDays = state.tracker.filter((d) => d.evidencePhoto);

  function set(field, val) {
    onChangePatchNote({ ...state.patchNote, [field]: val });
  }

  async function copyPatchNote() {
    try {
      await navigator.clipboard.writeText(patchText);
      setCopyStatus("Patch Note berhasil disalin ke clipboard.");
    } catch {
      setCopyStatus("Gagal menyalin otomatis, silakan copy manual dari kotak teks.");
    }
    setTimeout(() => setCopyStatus(""), 3000);
  }

  async function exportData() {
    try {
      await navigator.clipboard.writeText(exportStateAsJson(state));
      setExportStatus("Mission data berhasil disalin sebagai JSON.");
    } catch {
      setExportStatus("Gagal menyalin otomatis, coba lagi ya.");
    }
    setTimeout(() => setExportStatus(""), 3000);
  }

  function runImport() {
    try {
      const parsed = parseImportedJson(importText);
      onImport(parsed);
      setImportError(null);
      setImportOpen(false);
      setImportText("");
    } catch (err) {
      setImportError("Format JSON tidak valid. Pastikan kamu paste hasil Export Mission Data yang asli.");
    }
  }

  function handleReset() {
    if (!resetConfirm) {
      setResetConfirm(true);
      return;
    }
    onReset();
  }

  async function exportPdf() {
    setPdfLoading(true);
    setPdfStatus("");
    try {
      await generatePatchNotePdf({
        identity: state.identity,
        mission: state.mission,
        patchText,
        tracker: state.tracker,
      });
    } catch (err) {
      setPdfStatus("Gagal membuat PDF, coba lagi ya.");
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <TerminalFrame title="patch_note_generator.exe">
      <h2 className="mb-1 text-xl font-bold text-slate-50">Patch Note Generator</h2>
      <p className="mb-5 text-sm text-slate-400">
        Lengkapi ringkasan singkat, lalu generate Patch Note v1.0 kamu.
      </p>

      <div className="mb-5 space-y-4">
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Hal yang berhasil
          </label>
          <textarea
            value={state.patchNote.hasilBerhasil}
            onChange={(e) => set("hasilBerhasil", e.target.value)}
            rows={2}
            placeholder="Contoh: aku jadi lebih konsisten mulai tugas lebih awal"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-mono uppercase tracking-wider text-slate-400">
            Hal yang belum berhasil / kendala
          </label>
          <textarea
            value={state.patchNote.kendala}
            onChange={(e) => set("kendala", e.target.value)}
            rows={2}
            placeholder="Contoh: masih suka kebablasan scroll HP malam hari"
            className="w-full rounded-lg border border-console-border bg-black/30 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-console-accent"
          />
        </div>
      </div>

      <div className="rounded-lg border border-console-border/60 bg-black/30 p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
          Preview Patch Note v1.0
        </p>
        <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-slate-300">
          {patchText}
        </pre>
      </div>

      {photoDays.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-console-accent2/80">
            Galeri Bukti Pengerjaan
          </p>
          <div className="flex flex-wrap gap-3">
            {photoDays.map((d) => (
              <div key={d.day} className="w-24 text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.evidencePhoto}
                  alt={`Bukti hari ke-${d.day}`}
                  className="h-24 w-24 rounded-lg border border-console-border object-cover"
                />
                <p className="mt-1 text-[10px] text-slate-500">Hari {d.day}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {copyStatus && <p className="mt-2 text-xs text-console-accent">{copyStatus}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={copyPatchNote}>Copy Patch Note</Button>
        <Button variant="secondary" onClick={exportPdf} disabled={pdfLoading}>
          {pdfLoading ? "Membuat PDF..." : "Export as PDF"}
        </Button>
        <Button variant="secondary" onClick={exportData}>
          Export Mission Data
        </Button>
        <Button variant="secondary" onClick={() => setImportOpen((v) => !v)}>
          Import Mission Data
        </Button>
        <Button variant="danger" onClick={handleReset}>
          {resetConfirm ? "Yakin? Klik lagi untuk reset" : "Reset Mission"}
        </Button>
      </div>

      {pdfStatus && <p className="mt-2 text-xs text-console-warn">{pdfStatus}</p>}
      {exportStatus && <p className="mt-2 text-xs text-console-accent">{exportStatus}</p>}

      {importOpen && (
        <div className="mt-4 rounded-lg border border-console-border/60 bg-black/20 p-4">
          <p className="mb-2 text-xs text-slate-400">
            Paste JSON hasil Export Mission Data sebelumnya di sini.
          </p>
          <Warning>{importError}</Warning>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={5}
            placeholder="Paste JSON di sini..."
            className="w-full rounded-lg border border-console-border bg-black/30 px-3 py-2 font-mono text-xs text-slate-100 outline-none focus:border-console-accent"
          />
          <div className="mt-2 flex justify-end">
            <Button onClick={runImport}>Muat Mission Data</Button>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <span />
      </div>
    </TerminalFrame>
  );
}
