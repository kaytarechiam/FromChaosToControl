const STORAGE_KEY = "ftcc_recovery_console_v1";

export function getDefaultState() {
  return {
    step: 0,
    identity: { nama: "", nim: "", klan: "" },
    mission: null,
  };
}

export function loadState() {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    const defaultState = getDefaultState();
    const hasMission = Boolean(parsed?.mission);
    return {
      step: hasMission ? 2 : Number(parsed?.step) === 1 ? 1 : 0,
      identity: { ...defaultState.identity, ...parsed?.identity },
      mission: parsed?.mission || null,
    };
  } catch (err) {
    return getDefaultState();
  }
}

export function saveState(state) {
  if (typeof window === "undefined") return true;
  try {
    const cardState = {
      step: state.mission ? 2 : state.step === 1 ? 1 : 0,
      identity: state.identity,
      mission: state.mission,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cardState));
    return true;
  } catch (err) {
    return false;
  }
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
