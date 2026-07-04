// Data misi: Chaos Boss, Control Move, Mission Modifier
// Urutan array = index yang dipakai oleh logic generator (lib/generateMission.js)

export const CHAOS_BOSSES = [
  { id: 0, name: "Deadline Hydra", desc: "tugas terasa datang dari banyak arah" },
  { id: 1, name: "Doomscroll Slime", desc: "distraksi HP dan scroll berlebihan" },
  { id: 2, name: "Overthinking Ghost", desc: "terlalu banyak mikir sampai susah mulai" },
  { id: 3, name: "Social Battery Zombie", desc: "energi sosial cepat habis" },
  { id: 4, name: "Perfectionist Trap", desc: "susah selesai karena ingin terlalu sempurna" },
  { id: 5, name: "Sleep Debt Monster", desc: "pola tidur dan energi berantakan" },
  { id: 6, name: "Groupwork Goblin", desc: "koordinasi KLAN atau tim bikin chaos" },
  { id: 7, name: "Panic Mode Phantom", desc: "mudah panik saat agenda menumpuk" },
  { id: 8, name: "Schedule Earthquake", desc: "rencana sering rusak karena agenda berubah" },
  { id: 9, name: "Motivation Void", desc: "semangat naik turun dan sulit konsisten" },
];

export const CONTROL_MOVES = [
  { id: 0, name: "Two-Minute Start Rule", instruction: "mulai tugas minimal 2 menit sebelum memutuskan lanjut atau berhenti" },
  { id: 1, name: "Priority 3 Checklist", instruction: "tentukan 3 prioritas utama setiap hari" },
  { id: 2, name: "25-Minute Focus Sprint", instruction: "kerjakan tugas dalam blok fokus 25 menit" },
  { id: 3, name: "If-Then Emergency Plan", instruction: 'buat rencana "jika terjadi X, maka aku akan melakukan Y"' },
  { id: 4, name: "Buddy Checkpoint", instruction: "minta satu teman mengecek progres secara singkat" },
  { id: 5, name: "Energy-Based Scheduling", instruction: "letakkan tugas berat di jam energi terbaik" },
];

export const MISSION_MODIFIERS = [
  { id: 0, name: "48-Hour Protocol", desc: "lakukan selama 48 jam", durationDays: 2 },
  { id: 1, name: "72-Hour Protocol", desc: "lakukan selama 72 jam", durationDays: 3 },
  { id: 2, name: "Daily Evidence Log", desc: "tambahkan 1 bukti penerapan setiap hari", durationDays: 2 },
  { id: 3, name: "Nightly Debrief", desc: "lakukan evaluasi singkat setiap malam", durationDays: 2 },
  { id: 4, name: "Backup Protocol", desc: "buat 1 backup plan jika rencana gagal", durationDays: 2 },
];

export const KLAN_OPTIONS = [
  "KLAN I",
  "KLAN II",
  "KLAN III",
  "KLAN IV",
  "KLAN V",
  "KLAN VI",
  "KLAN VII",
  "KLAN VIII",
  "KLAN IX",
  "KLAN X",
];

export const KEKUATAN_OPTIONS = [
  "cepat belajar dari pengalaman",
  "bisa fokus saat target jelas",
  "cukup disiplin jika ada struktur",
  "berani bertanya saat butuh bantuan",
  "bisa bekerja cepat saat deadline",
  "mudah beradaptasi",
  "mampu bekerja sama",
  "punya rasa tanggung jawab tinggi",
];

export const KETERBATASAN_OPTIONS = [
  "mudah terdistraksi HP",
  "suka menunda",
  "susah mulai",
  "mudah panik",
  "terlalu perfeksionis",
  "sulit bilang tidak",
  "jadwal tidur berantakan",
  "energi cepat habis",
];
