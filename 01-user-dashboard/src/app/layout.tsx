import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@/lib/contexts/UserContext';
import { BotProvider } from '@/lib/contexts/BotContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "TeleShop - Платформа для создания Telegram магазинов",
  description: "Создавайте профессиональные Telegram магазины за 5 минут",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <UserProvider>
          <BotProvider>
            {children}
          </BotProvider>
        </UserProvider>
      </body>
    </html>
  );
}
