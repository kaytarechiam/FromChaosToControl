const STORAGE_KEY = "ftcc_recovery_console_v1";

export function buildTrackerDays(durationDays) {
  return Array.from({ length: durationDays }, (_, i) => ({
    day: i + 1,
    tried: "",
    chaosLevel: 3,
    energyLevel: 3,
    evidence: "",
    evidencePhoto: "",
    note: "",
  }));
}

export function getDefaultState() {
  return {
    step: 0,
    identity: { nama: "", nim: "", klan: "" },
    mission: null,
    chaosProfile: {
      kekuatan: [],
      keterbatasan: [],
      situasi: "",
      kebiasaan: "",
    },
    controlPlan: {
      kekuatanDipakai: "",
      keterbatasanAntisipasi: "",
      rencana: "",
      waktu: "",
      backup: "",
    },
    tracker: [],
    patchNote: {
      hasilBerhasil: "",
      kendala: "",
    },
  };
}

export function loadState() {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return { ...getDefaultState(), ...parsed };
  } catch (err) {
    return getDefaultState();
  }
}

export function saveState(state) {
  if (typeof window === "undefined") return true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    // biasanya localStorage penuh (foto bukti kegedean) atau diblokir browser
    return false;
  }
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function exportStateAsJson(state) {
  return JSON.stringify(state, null, 2);
}

export function parseImportedJson(jsonText) {
  const parsed = JSON.parse(jsonText);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Format JSON tidak sesuai struktur mission data.");
  }
  return { ...getDefaultState(), ...parsed };
}

export { STORAGE_KEY };
