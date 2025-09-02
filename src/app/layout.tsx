import type { Metadata } from "next";
import { InfoProvider } from "@/provider";
import "./globals.css";

//check if the user has any wallet existing then return that only

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
