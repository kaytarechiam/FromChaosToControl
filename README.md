# From Chaos To Control: System Recovery Console

Generator Mission Card ringan untuk SPARTANS. Website hanya digunakan untuk
mengisi identitas, randomize misi berdasarkan NIM TPB, menampilkan Mission Card,
dan mengunduhnya sebagai JPG untuk dilampirkan ke PDF tugas.

## Fitur

- Input identitas: Nama, NIM TPB, dan KLAN
- Dropdown KLAN I sampai KLAN X
- Mission generator deterministic berdasarkan NIM TPB
- Hasil Mission Card berisi Nama, NIM TPB, KLAN, Chaos Boss, Control Move, dan Mission Modifier
- Mission Modifier berdurasi maksimal 48 jam
- Export Mission Card sebagai JPG
- Hanya Mission Card terakhir yang disimpan sementara di `localStorage`

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
3. Vercel otomatis mendeteksi framework Next.js, biarkan build command dan output default (`next build`).
4. Klik **Deploy**. Tidak ada environment variable yang diperlukan.

## Catatan

- Website hanya memiliki alur: isi identitas, generate Mission Card, export JPG.
- Pengisian kondisi awal diri, rencana pengelolaan diri, catatan penerapan, dan
  refleksi akhir dilakukan pada lampiran pengerjaan terpisah.
