import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import PaymentModal from "./components/PaymentModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Safe Instrumentation in Endodontics — Endoholic",
  description: "Purchase Safe Instrumentation in Endodontics, a practical digital book for safer and more predictable endodontic treatment.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Safe Instrumentation in Endodontics — Endoholic",
    description: "A practical digital book for safer and more predictable endodontic instrumentation.",
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
      <body>
        <SubscriptionProvider>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 flex flex-col">{children}</main>
            <SiteFooter />
          </div>
          <PaymentModal />
        </SubscriptionProvider>
      </body>
    </html>
  );
}