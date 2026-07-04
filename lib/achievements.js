export function calcAchievements({ tracker, bossHp }) {
  const triedDays = (tracker || []).filter((d) => d.tried === "ya").length;
  const hasEvidence = (tracker || []).some((d) => d.evidence?.trim() || d.evidencePhoto);
  const hasNote = (tracker || []).some((d) => d.note?.trim());

  return [
    {
      id: "first-strike",
      name: "First Strike",
      desc: "Mencoba rencana minimal 1 hari",
      earned: triedDays >= 1,
    },
    {
      id: "evidence-hunter",
      name: "Evidence Hunter",
      desc: "Mengisi bukti teks atau upload foto",
      earned: hasEvidence,
    },
    {
      id: "system-stabilizer",
      name: "System Stabilizer",
      desc: "Mencoba rencana minimal 2 hari",
      earned: triedDays >= 2,
    },
    {
      id: "chaos-reader",
      name: "Chaos Reader",
      desc: "Mengisi Battle Note berhasil/gagal",
      earned: hasNote,
    },
    {
      id: "boss-slayer",
      name: "Boss Slayer",
      desc: "HP boss akhir 30 atau kurang",
      earned: bossHp <= 30,
    },
    {
      id: "recovery-initiate",
      name: "Recovery Initiate",
      desc: "Menyelesaikan seluruh alur sampai Mission Report",
      earned: true,
    },
  ];
}
