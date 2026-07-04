import { calcBossHp, getBossStatus } from "./bossHp";
import { calcAchievements } from "./achievements";

export function buildBattleLogSummary(tracker) {
  if (!tracker || tracker.length === 0) {
    return "belum ada Battle Log yang dicatat";
  }
  const parts = tracker
    .filter((d) => d.tried || d.evidence || d.evidencePhoto)
    .map((d) => {
      const status =
        d.tried === "ya" ? "menyerang boss" : d.tried === "tidak" ? "tidak menyerang" : "belum diisi";
      const bits = [];
      if (d.evidencePhoto) bits.push("foto bukti terlampir");
      if (d.evidence) bits.push(d.evidence);
      const detail = bits.length ? ` (${bits.join(", ")})` : "";
      return `Hari ${d.day} ${status}${detail}`;
    });
  if (parts.length === 0) return "belum ada Battle Log yang dicatat";
  return parts.join("; ");
}

export function getMissionReportData(state) {
  const { finalHp } = calcBossHp(state.tracker);
  const battleResult = getBossStatus(finalHp);
  const achievements = calcAchievements({ tracker: state.tracker, bossHp: finalHp });
  return { bossHp: finalHp, battleResult, achievements };
}

export function buildMissionReportText(state) {
  const { identity, mission, controlPlan, tracker, missionReport } = state;
  const { bossHp, battleResult, achievements } = getMissionReportData(state);
  const earnedBadges = achievements.filter((a) => a.earned).map((a) => a.name);

  const battleLogSummary = buildBattleLogSummary(tracker);
  const hasil = missionReport.hasilBerhasil?.trim() || "belum ada catatan spesifik";
  const kendala = missionReport.kendala?.trim() || "belum ada kendala besar yang tercatat";
  const kesimpulan = missionReport.kesimpulan?.trim() || "belum dituliskan";

  return `Mission Report

Nama: ${identity.nama}
NIM: ${identity.nim}
KLAN: ${identity.klan}
Chaos Boss: ${mission?.chaosBoss?.name || "-"}
Control Move: ${mission?.controlMove?.name || "-"}
Mission Modifier: ${mission?.modifier?.name || "-"}
Boss HP Akhir: ${bossHp}/100
Battle Result: ${battleResult}
Achievement Badge: ${earnedBadges.length ? earnedBadges.join(", ") : "belum ada"}

Rencana yang aku buat adalah ${controlPlan.rencana || "-"}. Rencana ini sesuai dengan kekuatanku karena aku memiliki ${controlPlan.kekuatanDipakai || "-"}. Keterbatasan yang perlu aku antisipasi adalah ${controlPlan.keterbatasanAntisipasi || "-"}. Selama misi, aku menerapkan rencana ini melalui ${battleLogSummary}. Hal yang berhasil adalah ${hasil}. Hal yang belum berhasil adalah ${kendala}. Kesimpulan akhir dari misi ini adalah ${kesimpulan}.`;
}
