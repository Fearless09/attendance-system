import { Inter } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from './context'
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Attendance System',
  description: 'Attendance system - created by Ajayi Toheeb Opeyemi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          {children}
          <ToastContainer />
        </AppContextProvider>
      </body>
    </html>
  )
}
