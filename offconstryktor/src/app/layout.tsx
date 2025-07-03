import '../../styles/index.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'TeleShop Constructor',
  description: 'Создавайте профессиональные Telegram магазины с drag & drop конструктором',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 