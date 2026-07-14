function sanitizeFilePart(value, fallback) {
  const safe = String(value || "")
    .trim()
    .replace(/[^\w-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return safe || fallback;
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text || "-").split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth || !line) {
      line = testLine;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const lines = wrapText(ctx, text, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawPanel(ctx, x, y, width, height) {
  roundedRect(ctx, x, y, width, height, 28);
  ctx.fillStyle = "rgba(11, 16, 21, 0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(57, 255, 157, 0.32)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawInfo(ctx, label, value, x, y, width) {
  ctx.fillStyle = "rgba(56, 240, 255, 0.9)";
  ctx.font = "700 25px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillText(label.toUpperCase(), x, y);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 38px Arial, sans-serif";
  return drawWrappedText(ctx, value, x, y + 48, width, 45, 2);
}

function drawMissionBlock(ctx, label, title, detail, x, y, width, height) {
  drawPanel(ctx, x, y, width, height);

  ctx.fillStyle = "rgba(57, 255, 157, 0.9)";
  ctx.font = "700 25px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillText(label.toUpperCase(), x + 44, y + 58);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 48px Arial, sans-serif";
  const afterTitle = drawWrappedText(ctx, title, x + 44, y + 118, width - 88, 56, 2);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "400 31px Arial, sans-serif";
  drawWrappedText(ctx, detail, x + 44, afterTitle + 22, width - 88, 40, 3);
}

export function exportMissionCardJpg({ identity, mission }) {
  const canvas = document.createElement("canvas");
  const width = 1440;
  const height = 1780;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#05070a");
  bg.addColorStop(0.55, "#0b1015");
  bg.addColorStop(1, "#07120e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(57, 255, 157, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(57, 255, 157, 0.12)";
  ctx.beginPath();
  ctx.arc(width * 0.82, height * 0.08, 310, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(56, 240, 255, 0.9)";
  ctx.font = "700 28px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.fillText("[ SPARTA AFTER-DAY PROTOCOL ]", 96, 116);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "900 78px Arial, sans-serif";
  ctx.fillText("From Chaos To Control", 96, 216);

  ctx.fillStyle = "#39ff9d";
  ctx.font = "800 54px Arial, sans-serif";
  ctx.fillText("System Recovery Console", 96, 292);

  ctx.fillStyle = "rgba(203, 213, 225, 0.86)";
  ctx.font = "400 30px Arial, sans-serif";
  ctx.fillText("Mission Card", 96, 348);

  drawPanel(ctx, 96, 410, 1248, 250);
  drawInfo(ctx, "Nama", identity.nama, 140, 480, 560);
  drawInfo(ctx, "NIM TPB", identity.nim, 760, 480, 250);
  drawInfo(ctx, "KLAN", identity.klan, 1070, 480, 210);

  drawMissionBlock(
    ctx,
    "Chaos Boss",
    mission.chaosBoss.name,
    mission.chaosBoss.desc,
    96,
    730,
    1248,
    260
  );
  drawMissionBlock(
    ctx,
    "Control Move",
    mission.controlMove.name,
    mission.controlMove.instruction,
    96,
    1030,
    1248,
    280
  );
  drawMissionBlock(
    ctx,
    "Mission Modifier",
    mission.modifier.name,
    mission.modifier.desc,
    96,
    1350,
    1248,
    280
  );

  ctx.fillStyle = "rgba(148, 163, 184, 0.86)";
  ctx.font = "400 25px Arial, sans-serif";
  drawWrappedText(
    ctx,
    "Unduh Mission Card ini dalam bentuk JPG, lalu lampirkan pada file PDF tugas.",
    96,
    1692,
    1248,
    34,
    2
  );

  const filename = `mission-card-${sanitizeFilePart(identity.nim, "sparta")}.jpg`;
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg", 0.94);
  link.download = filename;
  link.click();
}
