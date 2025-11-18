import React from 'react';
import { useBrainrot } from '../contexts/BrainrotContext';

const BrainrotToggle: React.FC = () => {
  const { isBrainrot, toggleBrainrot } = useBrainrot();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <label htmlFor="brainrot-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="brainrot-toggle"
            className="sr-only"
            checked={isBrainrot}
            onChange={toggleBrainrot}
          />
          <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isBrainrot ? 'transform translate-x-6 bg-neon-purple' : ''}`}></div>
        </div>
        <div className="ml-3 text-white font-medium">
          Brainrot Mode
        </div>
      </label>
    </div>
  );
};

export default BrainrotToggle;
