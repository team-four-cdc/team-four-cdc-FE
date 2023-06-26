"use client"
import React from 'react'
import { Poppins } from 'next/font/google'
import Providers from '@/store/provider'
import '../styles/globals.css'
import { ConfigProvider, theme } from 'antd'

const inter = Poppins({
  display: "swap",
  weight: ["500", "600", "700"],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: '"Poppins", sans-serif',
                colorPrimary: '#5abf41',
                colorInfo: '#555050',
                colorSuccess: '#5abf41',
                colorWarning: '#ede642',
                colorError: '#ca3144',
              },
              algorithm: theme.defaultAlgorithm,
              components: {
                Button: {
                  colorPrimary: '#5abf41',
                },
                Typography: {
                  fontWeightStrong: 600
                },
              }
            }}
          >
            {children}
          </ConfigProvider>
        </Providers>
      </body>
    </html>
  )
}
