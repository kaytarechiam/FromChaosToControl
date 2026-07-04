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
          Kuliah dan SPARTA bisa terasa seperti sistem yang penuh error: jadwal
          berubah, tugas numpuk, energi naik turun, dan distraksi datang terus.
          Di misi ini, kamu akan mendeteksi Chaos Boss utama dalam dirimu, menyusun
          Battle Strategy berdasarkan kekuatan dan keterbatasanmu, lalu
          menerapkannya dalam kehidupan nyata sampai boss itu berhasil kamu taklukkan.
        </p>
      </TerminalFrame>

      <Button onClick={onStart} className="px-8 py-3 text-base">
        &gt; Start Recovery Mission_
      </Button>

      <p className="max-w-md text-xs text-slate-500">
        Progress kamu tersimpan di browser ini. Jangan gunakan incognito dan
        jangan hapus cache sebelum Mission Report selesai dibuat.
      </p>
    </div>
  );
}
