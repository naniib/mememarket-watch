import React from 'react';

interface FearGreedMeterProps {
  value: number; // 0-100
  size?: number;
}

const FearGreedMeter = ({ value, size = 200 }: FearGreedMeterProps) => {
  const radius = (size - 40) / 2;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const needleAngle = -90 + (value / 100) * 180;
  
  const getColor = (v: number) => {
    if (v <= 25) return '#ef4444'; // Red - Extreme Fear
    if (v <= 45) return '#f97316'; // Orange - Fear
    if (v <= 55) return '#eab308'; // Yellow - Neutral
    if (v <= 75) return '#84cc16'; // Light Green - Greed
    return '#22c55e'; // Green - Extreme Greed
  };
  
  const getLabel = (v: number) => {
    if (v <= 25) return 'Extreme Fear';
    if (v <= 45) return 'Fear';
    if (v <= 55) return 'Neutral';
    if (v <= 75) return 'Greed';
    return 'Extreme Greed';
  };

  const currentColor = getColor(value);
  const label = getLabel(value);
  const gradientId = `fearGreedGradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size * 0.6 }}>
        <svg width={size} height={size * 0.6} className="overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <path d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`} fill="none" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
          <path d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`} fill="none" stroke={`url(#${gradientId})`} strokeWidth="12" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${currentColor}40)` }} />
          <g transform={`rotate(${needleAngle} ${centerX} ${centerY})`} className="transition-transform duration-1000 ease-out">
            <path d={`M ${centerX} ${centerY - 5} L ${centerX + radius - 10} ${centerY} L ${centerX} ${centerY + 5} Z`} fill={currentColor} style={{ filter: `drop-shadow(0 0 6px ${currentColor}80)` }} />
          </g>
          <circle cx={centerX} cy={centerY} r="8" fill={currentColor} className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 6px ${currentColor}80)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '20%' }}>
          <div className="text-3xl font-bold mb-1" style={{ color: currentColor }}>{value}</div>
          <div className="text-sm font-bold" style={{ color: currentColor }}>{label}</div>
        </div>
      </div>
      <div className="flex justify-between w-full mt-2 text-xs text-gray-400 px-4">
        <span>Fear</span>
        <span>Neutral</span>
        <span>Greed</span>
      </div>
    </div>
  );
};

export default FearGreedMeter;
