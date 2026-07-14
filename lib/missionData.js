// Data misi: Chaos Boss, Control Move, Mission Modifier
// Urutan array = index yang dipakai oleh logic generator (lib/generateMission.js)

export const CHAOS_BOSSES = [
  { id: 0, name: "Deadline Hydra", desc: "tugas terasa datang dari banyak arah" },
  { id: 1, name: "Doomscroll Slime", desc: "distraksi HP dan scroll berlebihan" },
  { id: 2, name: "Overthinking Ghost", desc: "terlalu banyak mikir sampai susah mulai" },
  { id: 3, name: "Social Battery Zombie", desc: "energi sosial cepat habis" },
  { id: 4, name: "Perfectionist Trap", desc: "susah selesai karena ingin terlalu sempurna" },
  { id: 5, name: "Sleep Debt Monster", desc: "pola tidur dan energi berantakan" },
  { id: 6, name: "Groupwork Glitch", desc: "koordinasi KLAN atau tim bikin chaos" },
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
  { id: 0, name: "48-Hour Protocol", desc: "jalankan Control Move selama maksimal 48 jam", durationHours: 48 },
  { id: 1, name: "24-Hour Quick Reset", desc: "jalankan Control Move dalam satu siklus 24 jam", durationHours: 24 },
  { id: 2, name: "Two-Checkpoint Log", desc: "catat 2 checkpoint singkat dalam maksimal 48 jam", durationHours: 48 },
  { id: 3, name: "Nightly Debrief", desc: "lakukan evaluasi singkat malam ini dan besok malam", durationHours: 48 },
  { id: 4, name: "Backup Protocol", desc: "buat 1 backup plan dan uji dalam maksimal 48 jam", durationHours: 48 },
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
