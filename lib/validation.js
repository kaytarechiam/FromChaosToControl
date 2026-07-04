export const FRIENDLY_WARNING =
  "Lengkapi bagian ini dulu ya biar sistem recovery kamu nggak setengah jalan.";

export function validateIdentity(identity) {
  if (!identity.nama?.trim()) return "Nama wajib diisi.";
  if (!identity.nim?.trim()) return "NIM wajib diisi.";
  if (!/^\d+$/.test(identity.nim.trim())) return "NIM hanya boleh berisi angka.";
  if (!identity.klan) return "KLAN wajib dipilih.";
  return null;
}

export function validateChaosProfile(profile) {
  if (
    !profile.kekuatan?.length ||
    profile.kekuatan.length < 2 ||
    !profile.keterbatasan?.length ||
    profile.keterbatasan.length < 2 ||
    !profile.situasi?.trim() ||
    !profile.kebiasaan?.trim()
  ) {
    return FRIENDLY_WARNING;
  }
  return null;
}

export function validateControlPlan(plan) {
  const required = [
    plan.kekuatanDipakai,
    plan.keterbatasanAntisipasi,
    plan.rencana,
    plan.waktu,
    plan.backup,
  ];
  if (required.some((v) => !v?.trim())) {
    return FRIENDLY_WARNING;
  }
  return null;
}

export function validateTrackerHasEntry(tracker) {
  const hasEntry = tracker?.some((d) => d.tried || d.evidence?.trim() || d.evidencePhoto);
  if (!hasEntry) {
    return "Isi minimal satu catatan penerapan di Daily Tracker dulu ya, biar Patch Note nggak kosong.";
  }
  return null;
}
