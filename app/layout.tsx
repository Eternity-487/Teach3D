import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site"),
  title: "Teach3D｜把任何知识对象变成能操作的 3D 课程",
  description: "通用型 3D 教学内容生成 Skill：把实物、结构、系统和过程制作成可操作、可提问、可分享的双语互动课程。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Teach3D｜把任何知识对象变成能操作的 3D 课程",
    description: "通用教学类 3D Skill，包含双语说明、在线案例、效果配图和直接安装入口。",
    images: [{ url: "/assets/teach3d-showcase.jpg", width: 1200, height: 630, alt: "Teach3D 首个公开教学案例" }],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teach3D｜Interactive 3D lessons for any subject",
    description: "A reusable Skill for browser-based educational 3D experiences.",
    images: ["/assets/teach3d-showcase.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
