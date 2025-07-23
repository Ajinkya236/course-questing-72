
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Spin The Wheel</DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center">
            <p>Spin the wheel feature coming soon!</p>
            <Button onClick={closeSpinTheWheel} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
