import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata = {
  title: "NovaFrame",
  description: "NovaFrame: AI-Powered Image Generation Platform: Nova Frame is an advanced web application built by silentCosmo, designed to leverage artificial intelligence for generating visually stunning and customizable images. Whether you're an artist, designer, or enthusiast, NovaFrame provides a powerful toolkit to create captivating visuals effortlessly.",
  verification:{google:"RR0GT_WFjIOTSvDJ2dmhbPVKkhioCYB4e0YPXFa5W9c"},
}; */
export const metadata = {
  title: "NovaFrame | Free AI-Powered Image Generation Platform",
  description: "NovaFrame offers a free, cutting-edge AI image generation platform by silentCosmo. Create stunning and customizable visuals with advanced AI tools. Perfect for artists, designers, and enthusiasts seeking high-quality, creative image generation at no cost.",
  keywords: "Free AI image generation, NovaFrame, nova frame, artificial intelligence, free image creation, visual design, graphic design, AI tools, creative visuals, NovaGenie, silentCosmo",
  author: "silentCosmo",
  robots: "index, follow",
  verification: {
    google: "RR0GT_WFjIOTSvDJ2dmhbPVKkhioCYB4e0YPXFa5W9c",
  },
  openGraph: {
    title: "NovaFrame | Free AI-Powered Image Generation Platform",
    description: "Discover NovaFrame, a free AI-driven image generation platform by silentCosmo. Use advanced tools to create and customize beautiful visuals for art, design, and more without any cost.",
    url: "https://novaframe.netlify.app",
    siteName: "NovaFrame",
    images: [
      {
        url: "https://novaframe.netlify.app/_next/image?url=%2Fcarousel%2F12.jpg&w=1024&q=75",
        width: 1024,
        height: 1024,
        alt: "NovaFrame AI-Powered Image Generation Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaFrame | Free AI-Powered Image Generation Platform",
    description: "Explore NovaFrame, a free and advanced AI image generation platform by silentCosmo. Create and customize stunning visuals with powerful AI tools at no cost. Ideal for artists and designers.",
    image: "https://novaframe.netlify.app/_next/image?url=%2Fcarousel%2F12.jpg&w=1024&q=75",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-DT5D398TPK" />
    </html>
  );
}
