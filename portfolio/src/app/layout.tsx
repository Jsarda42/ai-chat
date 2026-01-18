import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Julien Sarda - Portfolio",
  description: "Portfolio website of Julien Sarda, software engineer specialized in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-500`}
      >
        {children}
      </body>
    </html>
  );
}
