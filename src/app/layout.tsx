import type { Metadata } from "next";
import "./globals.css";
import { ProductSans } from "./fonts";
import { ProviderWrappers } from "@/components/provider-wrappers";

export const metadata: Metadata = {
  title: "BakeCraft",
  description: "Take your bakery to the next level today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ProductSans.className}  antialiased`}>
        <ProviderWrappers>{children}</ProviderWrappers>
      </body>
    </html>
  );
}
