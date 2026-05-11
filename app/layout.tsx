import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "조선한그릇 - 쌀치국수 & 만두",
  icons: {
    icon: "/logo-icon.png",
  },
  description: "쌀치국수 3,500원 · 만두 2,000원 · 조선한그릇 본점",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}