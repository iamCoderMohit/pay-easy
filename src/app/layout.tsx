import type { Metadata } from "next";
import { Provider } from "@/provider";
import "./globals.css"

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
      <body
      >
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
