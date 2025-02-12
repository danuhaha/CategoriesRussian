import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"], // Include Cyrillic subset for Russian
  weight: ["400", "500", "700"], // Specify font weights
});


export const metadata: Metadata = {
  title: "Категории",
  description: "Составь 4 группы по 4 слова!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
