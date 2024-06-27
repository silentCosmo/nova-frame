import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NovaFrame",
  description: "NovaFrame: AI-Powered Image Generation Platform: NovaFrame is an advanced web application built by silentCosmo, designed to leverage artificial intelligence for generating visually stunning and customizable images. Whether you're an artist, designer, or enthusiast, NovaFrame provides a powerful toolkit to create captivating visuals effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
