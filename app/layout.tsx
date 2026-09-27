import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "光链研究 · AI 光互连产业研究工作台",
  description: "产业链证据、跨市场可比与事件传导。所有关键结论可追溯至官方公开材料。",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
