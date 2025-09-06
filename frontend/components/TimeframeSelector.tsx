import React from 'react';

interface TimeframeSelectorProps {
  selected: string;
  onChange: (timeframe: string) => void;
}

const TimeframeSelector = ({ selected, onChange }: TimeframeSelectorProps) => {
  const timeframes = ['1M', '5M', '15M', '30M', '1H', '1D', '1Y'];

  return (
    <div className="flex space-x-1 bg-[#0D1117] p-1 rounded-md text-xs">
      {timeframes.map(t => (
        <button 
          key={t}
          onClick={() => onChange(t)}
          className={`px-2 py-1 rounded transition-colors duration-200 ${
            selected === t 
              ? 'bg-[#30363D] text-white' 
              : 'text-gray-400 hover:bg-[#30363D]/50'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
