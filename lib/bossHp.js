const START_HP = 100;

// Menghitung damage ke Chaos Boss untuk satu hari Battle Log.
// Aturan (independen, bisa gabung dalam satu hari):
// - dicoba (tried "ya"): -30
// - ada bukti (foto atau teks): -20
// - chaos level 1 atau 2: -10
// - tidak dicoba (tried "tidak"): +15 (boss pulih)
export function calcDayDamage(day) {
  let damage = 0;
  if (day.tried === "ya") damage += 30;
  if (day.evidence?.trim() || day.evidencePhoto) damage += 20;
  if (day.chaosLevel === 1 || day.chaosLevel === 2) damage += 10;
  if (day.tried === "tidak") damage -= 15;
  return damage;
}

function clampHp(hp) {
  return Math.max(0, Math.min(100, hp));
}

// HP boss berjalan (running), diperbarui hari demi hari, diklem tiap hari
// supaya boss tidak pernah tampil di bawah 0 atau di atas 100.
export function calcBossHp(tracker) {
  let hp = START_HP;
  const history = [];
  for (const day of tracker || []) {
    const damage = calcDayDamage(day);
    hp = clampHp(hp - damage);
    history.push({ day: day.day, damage, hpAfter: hp });
  }
  return { finalHp: hp, history };
}

export function getBossStatus(hp) {
  if (hp <= 30) return "Boss Defeated";
  if (hp <= 70) return "Boss Weakened";
  return "Boss Still Active";
}
