# From Chaos To Control: System Recovery Console

Mission generator dan personal dashboard ringan untuk SPARTANS menyusun dan
menerapkan rencana pengelolaan diri (after-day SPARTA task). Dibangun dengan
Next.js (App Router) + Tailwind CSS. Tidak ada backend, database, atau login —
semua data tersimpan di `localStorage` browser.

## Fitur

- Mission generator berdasarkan NIM (Chaos Boss, Control Move, Mission Modifier)
- Chaos Profile (kekuatan & keterbatasan diri)
- Control Plan
- Daily Tracker (48/72 jam sesuai Mission Modifier) dengan upload foto bukti pengerjaan (dikompres otomatis di browser sebelum disimpan)
- Patch Note Generator + Copy Patch Note
- Export Patch Note sebagai PDF (teks + foto bukti pengerjaan)
- Export & Import Mission Data (JSON via clipboard)
- Reset Mission
- Progress otomatis tersimpan di browser (localStorage)

## Menjalankan secara lokal

Pastikan Node.js versi 18 ke atas sudah terpasang.

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deploy ke Vercel

1. Push project ini ke repository GitHub/GitLab/Bitbucket.
2. Buka [vercel.com](https://vercel.com), klik **Add New Project**, lalu import repository tersebut.
3. Vercel otomatis mendeteksi framework Next.js — biarkan build command dan output default (`next build`).
4. Klik **Deploy**. Tidak ada environment variable yang diperlukan karena semua data disimpan di browser (localStorage), tidak ada backend/database.

## Catatan

- Jangan gunakan mode incognito/private saat mengerjakan misi, karena `localStorage` akan hilang saat sesi ditutup.
- Gunakan tombol **Export Mission Data** untuk membackup progress (disalin sebagai JSON ke clipboard), dan **Import Mission Data** untuk memulihkannya di device/browser lain.
- Foto bukti pengerjaan disimpan sebagai base64 di `localStorage` (browser umumnya membatasi kapasitas ini sekitar 5-10MB). Kalau muncul warning gagal simpan otomatis, gunakan foto dengan ukuran lebih kecil atau kurangi jumlah foto.
