import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "From Chaos To Control: System Recovery Console",
  description:
    "Generator Mission Card after-day SPARTA untuk identitas, randomize misi, dan export JPG.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="bg-console-bg text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
