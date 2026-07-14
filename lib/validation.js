export function validateIdentity(identity) {
  if (!identity.nama?.trim()) return "Nama wajib diisi.";
  if (!identity.nim?.trim()) return "NIM TPB wajib diisi.";
  if (!/^\d+$/.test(identity.nim.trim())) return "NIM TPB hanya boleh berisi angka.";
  if (!identity.klan) return "KLAN wajib dipilih.";
  return null;
}
