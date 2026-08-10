import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Endoholic — Endodontics Education",
  description: "Endoholic — Endodontics education platform for clinicians and students. Courses, books, and evidence-based learning.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Endoholic — Endodontics Education",
    description: "Clinical courses, books, and interactive learning for endodontists and dental students.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1724",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}