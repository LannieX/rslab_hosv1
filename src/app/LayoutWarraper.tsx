'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'
import { IconButton } from '@mui/material'
import Sidebar from './componants/sidebar'
import { useMobileSize } from './contexts/MobileSizeContext'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/loginPage'
  const mobileSize = useMobileSize()

  const [showSideBar, setShowSideBar] = useState(true)

  useEffect(() => {
    if (mobileSize) {
      setShowSideBar(false)
    } else {
      setShowSideBar(true)
    }
  }, [mobileSize, pathname])

  return (
    <>
      {mobileSize && !showSideBar && !isLoginPage && (
        <div className="absolute top-7.5 left-4 z-50">
          <IconButton onClick={() => setShowSideBar(true)}>
            <MenuIcon color="#C3C3C3" className="w-8 h-8 cursor-pointer" />
          </IconButton>
        </div>
      )}

      <div className={`flex h-screen overflow-hidden ${mobileSize ? 'relative' : ''}`}>
        {!isLoginPage && (
          <div
            className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-md transition-transform duration-300 ease-in-out
            ${mobileSize && !showSideBar ? '-translate-x-full' : 'translate-x-0'}`}
          >
            {mobileSize && showSideBar && (
              <div className="absolute top-4 right-4 z-0">
                <IconButton onClick={() => setShowSideBar(false)}>
                  <XIcon color="#d75e6d" className="w-6 h-6 cursor-pointer" />
                </IconButton>
              </div>
            )}
            <Sidebar />
          </div>
        )}

        <main
          className={`transition-all duration-300 ease-in-out overflow-auto bg-gray-100 ${
            isLoginPage ? 'w-full p-0' : mobileSize ? 'w-full p-6' : 'ml-64 w-full p-6'
          }`}
        >
          {children}
        </main>
      </div>
    </>
  )
}
