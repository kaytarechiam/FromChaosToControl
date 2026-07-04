const MAX_RAW_FILE_SIZE = 12 * 1024 * 1024; // 12MB, batas kasar sebelum dikompres

export function compressImageFile(file, { maxWidth = 1000, quality = 0.6 } = {}) {
  if (file.size > MAX_RAW_FILE_SIZE) {
    return Promise.reject(new Error("Ukuran file kegedean, pakai foto di bawah 12MB ya."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file foto."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("File yang dipilih bukan gambar yang valid."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
