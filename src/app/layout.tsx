import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mei Wedding Planning Dashboard",
  description: "Comprehensive wedding planning dashboard for your special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
