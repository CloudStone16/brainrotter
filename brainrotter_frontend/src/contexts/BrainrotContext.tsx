import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BrainrotContextType {
  isBrainrot: boolean;
  toggleBrainrot: () => void;
}

const BrainrotContext = createContext<BrainrotContextType | undefined>(undefined);

export const BrainrotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBrainrot, setIsBrainrot] = useState(false);

  const toggleBrainrot = () => {
    setIsBrainrot(prev => !prev);
  };

  return (
    <BrainrotContext.Provider value={{ isBrainrot, toggleBrainrot }}>
      {children}
    </BrainrotContext.Provider>
  );
};

export const useBrainrot = () => {
  const context = useContext(BrainrotContext);
  if (context === undefined) {
    throw new Error('useBrainrot must be used within a BrainrotProvider');
  }
  return context;
};
