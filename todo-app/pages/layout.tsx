import './globals.css'

export const metadata = {
  title: 'Todo App',
  description: 'Görev listesi uygulaması',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 min-h-screen p-4">{children}</body>
    </html>
  )
}
