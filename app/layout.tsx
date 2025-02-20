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
  metadataBase: new URL("https://games.onthewifi.com/categories"),
  icons: {
    icon: '/categories/icon.ico',  
    apple: '/categories/apple-icon.png',  
  },
  openGraph: {
    title: 'Категории',
    description: 'Составь 4 группы по 4 слова!',
    url: 'https://games.onthewifi.com/categories',
    siteName: 'Категории',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru',
    type: 'website',
  },

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
