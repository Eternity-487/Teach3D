import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trek-marlin-6-mechanical-teaching.qitan874.chatgpt.site"),
  title: "Teach3D｜把任何知识对象变成能操作的 3D 课程",
  description: "真实模型优先的 3D 教学 Skill：检查模型授权与来源，完成网页优化，再叠加双语热点、过程演示和课堂导学。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Teach3D｜把任何知识对象变成能操作的 3D 课程",
    description: "真实模型优先，兼顾授权、网页性能、双语教学热点、在线案例和直接安装。",
    images: [{ url: "/assets/teach3d-showcase.jpg", width: 1280, height: 640, alt: "Teach3D 通用互动教学项目" }],
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
