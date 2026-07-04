export async function generatePatchNotePdf({ identity, mission, patchText, tracker }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Patch Note v1.0", margin, y);
  y += 26;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const bodyLines = doc.splitTextToSize(patchText, pageWidth - margin * 2);
  doc.text(bodyLines, margin, y);
  y += bodyLines.length * 14 + 24;

  const photoDays = (tracker || []).filter((d) => d.evidencePhoto);

  for (const day of photoDays) {
    if (y > pageHeight - 100) {
      doc.addPage();
      y = margin;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Bukti Hari ke-${day.day}`, margin, y);
    y += 16;

    if (day.evidence?.trim()) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const capLines = doc.splitTextToSize(day.evidence, pageWidth - margin * 2);
      doc.text(capLines, margin, y);
      y += capLines.length * 12 + 8;
    }

    try {
      const props = doc.getImageProperties(day.evidencePhoto);
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin - y;
      let imgWidth = Math.min(maxWidth, 320);
      let imgHeight = (props.height * imgWidth) / props.width;

      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = (props.width * imgHeight) / props.height;
      }

      if (imgHeight < 40) {
        doc.addPage();
        y = margin;
        imgHeight = Math.min((props.height * imgWidth) / props.width, pageHeight - margin * 2);
      }

      doc.addImage(day.evidencePhoto, "JPEG", margin, y, imgWidth, imgHeight);
      y += imgHeight + 28;
    } catch {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text("(foto gagal dimuat)", margin, y);
      y += 20;
    }
  }

  const fileSafeNim = (identity?.nim || "sparta").replace(/\s+/g, "");
  doc.save(`patch-note-${fileSafeNim}.pdf`);
}
