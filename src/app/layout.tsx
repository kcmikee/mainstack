import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <style jsx global>{`
        html {
          font-family: ${bricolage.style.fontFamily};
        }
      `}</style>
      <body className={bricolage.className}>{children}</body>
    </html>
  );
}
