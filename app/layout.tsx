import type { Metadata } from "next";
import { Anton, JetBrains_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const script = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${profile.firstName} ${profile.lastName} · ${profile.role}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${anton.variable} ${script.variable} ${mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
