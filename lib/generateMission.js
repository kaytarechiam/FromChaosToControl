import { CHAOS_BOSSES, CONTROL_MOVES, MISSION_MODIFIERS } from "./missionData";

// Aturan:
// - Digit terakhir NIM -> Chaos Boss (0-9)
// - Jumlah seluruh digit NIM modulo 6 -> Control Move (0-5)
// - Dua digit terakhir NIM modulo 5 -> Mission Modifier (0-4)
export function generateMission(nimRaw) {
  const nim = String(nimRaw).replace(/\D/g, "");
  if (!nim) return null;

  const digits = nim.split("").map(Number);
  const lastDigit = digits[digits.length - 1];
  const digitSum = digits.reduce((acc, d) => acc + d, 0);
  const lastTwo = parseInt(nim.slice(-2), 10);

  const chaosBoss = CHAOS_BOSSES[lastDigit % 10];
  const controlMove = CONTROL_MOVES[digitSum % 6];
  const modifier = MISSION_MODIFIERS[lastTwo % 5];

  return { chaosBoss, controlMove, modifier };
}
