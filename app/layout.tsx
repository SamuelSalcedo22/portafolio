import type { Metadata } from "next";
import { Anton, JetBrains_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { tx } from "@/data/text";
import { prefsScript } from "@/lib/prefs-script";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const script = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${profile.firstName} ${profile.lastName} · ${tx(profile.role, "es")}`,
  description: tx(profile.tagline, "es"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${anton.variable} ${script.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
