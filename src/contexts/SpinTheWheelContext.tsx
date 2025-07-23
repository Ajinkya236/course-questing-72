
import React, { createContext, useContext, useState, ReactNode } from 'react';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';

type SpinTheWheelContextType = {
  openSpinTheWheel: () => void;
  closeSpinTheWheel: () => void;
};

const SpinTheWheelContext = createContext<SpinTheWheelContextType | undefined>(undefined);

export const SpinTheWheelProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openSpinTheWheel = () => setOpen(true);
  const closeSpinTheWheel = () => setOpen(false);

  return (
    <SpinTheWheelContext.Provider value={{ openSpinTheWheel, closeSpinTheWheel }}>
      {children}
      <SpinTheWheelDialog open={open} onOpenChange={setOpen} />
    </SpinTheWheelContext.Provider>
  );
};

export const useSpinTheWheel = () => {
  const context = useContext(SpinTheWheelContext);
  if (context === undefined) {
    throw new Error('useSpinTheWheel must be used within a SpinTheWheelProvider');
  }
  return context;
};
