// ChatAi/layout.jsx
import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function ChatAiLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`antialiased ${fontHeading.variable} ${fontBody.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
