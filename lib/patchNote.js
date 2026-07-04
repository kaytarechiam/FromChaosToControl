export function buildTrackerSummary(tracker) {
  if (!tracker || tracker.length === 0) {
    return "belum ada catatan penerapan harian";
  }
  const parts = tracker
    .filter((d) => d.tried || d.evidence || d.evidencePhoto)
    .map((d) => {
      const status = d.tried === "ya" ? "dicoba" : d.tried === "tidak" ? "belum dicoba" : "belum diisi";
      const bits = [];
      if (d.evidencePhoto) bits.push("foto bukti terlampir");
      if (d.evidence) bits.push(d.evidence);
      const detail = bits.length ? ` (${bits.join(", ")})` : "";
      return `Hari ${d.day} ${status}${detail}`;
    });
  if (parts.length === 0) return "belum ada catatan penerapan harian";
  return parts.join("; ");
}

export function buildPatchNoteText({ identity, mission, controlPlan, tracker, patchNote }) {
  const trackerSummary = buildTrackerSummary(tracker);
  const hasil = patchNote.hasilBerhasil?.trim() || "belum ada catatan spesifik";
  const kendala = patchNote.kendala?.trim() || "belum ada kendala besar yang tercatat";
  const backup = controlPlan.backup?.trim() || "belum ditentukan";

  return `Patch Note v1.0

Nama: ${identity.nama}
NIM: ${identity.nim}
KLAN: ${identity.klan}
Chaos Boss: ${mission?.chaosBoss?.name || "-"}
Control Move: ${mission?.controlMove?.name || "-"}
Mission Modifier: ${mission?.modifier?.name || "-"}

Rencana yang aku buat adalah ${controlPlan.rencana || "-"}. Rencana ini sesuai dengan kekuatanku karena aku memiliki ${controlPlan.kekuatanDipakai || "-"}. Keterbatasan yang perlu aku antisipasi adalah ${controlPlan.keterbatasanAntisipasi || "-"}. Selama misi, aku menerapkan rencana ini melalui ${trackerSummary}. Hal yang berhasil adalah ${hasil}. Hal yang belum berhasil adalah ${kendala}. Patch berikutnya yang akan aku lakukan adalah ${backup}.`;
}
