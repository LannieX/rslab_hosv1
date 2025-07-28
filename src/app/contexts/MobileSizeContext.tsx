'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const MobileSizeContext = createContext(false);

export const useMobileSize = () => useContext(MobileSizeContext);

export const MobileSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileSize, setMobileSize] = useState(false);

useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setMobileSize(window.innerWidth < 1000);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <MobileSizeContext.Provider value={mobileSize}>
      {children}
    </MobileSizeContext.Provider>
  );
};
