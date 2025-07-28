// contexts/MobileSizeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const MobileSizeContext = createContext(false);

export const useMobileSize = () => useContext(MobileSizeContext);

export const MobileSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mobileSize, setMobileSize] = useState(false);

  useEffect(() => {
    function handleResize() {
      setMobileSize(window.innerWidth < 1000);
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MobileSizeContext.Provider value={mobileSize}>
      {children}
    </MobileSizeContext.Provider>
  );
};
