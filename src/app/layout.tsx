import type { Metadata } from "next";
import { InfoProvider } from "@/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayEasy",
  description: "simulate how payment applications work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InfoProvider>{children}</InfoProvider>
      </body>
    </html>
  );
}
