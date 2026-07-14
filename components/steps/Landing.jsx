import TerminalFrame from "@/components/ui/TerminalFrame";
import Button from "@/components/ui/Button";

export default function Landing({ onStart }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-console-accent2/80">
        [ SPARTA AFTER-DAY PROTOCOL ]
      </p>
      <h1 className="text-3xl font-extrabold leading-tight text-slate-50 sm:text-5xl">
        From Chaos To Control
        <br />
        <span className="text-console-accent">System Recovery Console</span>
      </h1>
      <TerminalFrame title="mission_briefing.log" className="max-w-2xl text-left">
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Console ini sekarang hanya dipakai untuk mengisi identitas, melakukan
          randomize misi berdasarkan NIM TPB, dan mengunduh Mission Card sebagai JPG.
          Refleksi, rencana pengelolaan diri, catatan penerapan, dan refleksi akhir
          dikerjakan di lampiran pengerjaan terpisah.
        </p>
      </TerminalFrame>

      <Button onClick={onStart} className="px-8 py-3 text-base">
        &gt; Generate Mission Card_
      </Button>

      <p className="max-w-md text-xs text-slate-500">
        Alur singkat: isi identitas, generate Mission Card, lalu export JPG untuk
        dilampirkan ke PDF tugas.
      </p>
    </div>
  );
}
