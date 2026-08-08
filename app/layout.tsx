import "./globals.css";
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Endoholic — Endodontics education platform for clinicians and students. Courses, books, and evidence-based learning." />
        <meta name="theme-color" content="#0f1724" />
        <link rel="icon" href="/logo.svg" />
        <meta property="og:title" content="Endoholic — Endodontics Education" />
        <meta property="og:description" content="Clinical courses, books, and interactive learning for endodontists and dental students." />
        <meta property="og:image" content="/logo.svg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>{children}</body>
    </html>
  );
}