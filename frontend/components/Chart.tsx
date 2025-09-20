import React from 'react';
import { TrendingUp } from 'lucide-react';
import TimeframeSelector from './TimeframeSelector';
import type { Coin } from '../data';

interface ChartProps {
  coin: Coin;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const Chart = ({ coin, timeframe, onTimeframeChange }: ChartProps) => {
  // Mock chart data that simulates fluctuations based on coin properties
  const generateMockData = () => {
    const points = 50;
    let currentPrice = coin.price;

    // 1. Determine volatility based on riskLevel
    const riskVolatility = {
      'LOW': 0.5,
      'MEDIUM': 1.0,
      'HIGH': 1.5,
    };
    const volatilityMultiplier = riskVolatility[coin.riskLevel] || 1.0;

    // 2. Determine trend/drift based on Fear & Greed Index
    // (fearGreedIndex - 50) gives a range from -50 (fear) to +50 (greed)
    // This creates a slight drift in the price direction.
    const drift = (coin.fearGreedIndex - 50) * (currentPrice * 0.0005);

    // Generate points working backwards from the current price
    const dataPoints = [{
      y: currentPrice,
      timestamp: new Date()
    }];

    for (let i = 1; i < points; i++) {
      // Random fluctuation
      const randomFactor = (Math.random() - 0.5);
      // Fluctuation is a small percentage of the current price, scaled by volatility
      const fluctuation = randomFactor * currentPrice * 0.02 * volatilityMultiplier;
      
      // Calculate the previous price by reversing the trend's effect
      let prevPrice = currentPrice - (drift / points) - fluctuation;

      // Ensure price doesn't go negative or zero to avoid calculation issues
      currentPrice = Math.max(prevPrice, 0.000001);
      
      dataPoints.push({
        y: currentPrice,
        timestamp: new Date(Date.now() - i * 60000)
      });
    }
    
    // Reverse the array to get chronological order and add x coordinates
    return dataPoints.reverse().map((point, index) => ({
      ...point,
      x: index,
    }));
  };

  const data = generateMockData();
  const isPositive = data.length > 1 ? data[data.length - 1].y > data[0].y : true;
  const minPrice = Math.min(...data.map(d => d.y));
  const maxPrice = Math.max(...data.map(d => d.y));
  const priceRange = maxPrice - minPrice;

  const getPointsString = (normalize: (y: number) => number) => {
    if (data.length < 2) return '';
    return data.map((point, index) => 
      `${(index / (data.length - 1)) * 100},${normalize(point.y)}`
    ).join(' ');
  };
  
  const normalizeY = (y: number) => {
      if (priceRange === 0) return 50;
      return 100 - (((y - minPrice) / priceRange) * 80 + 10);
  };

  const points = getPointsString(normalizeY);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Price Chart</h3>
        </div>
        
        <TimeframeSelector 
          selected={timeframe}
          onChange={onTimeframeChange}
        />
      </div>
      
      <div className="relative flex-grow bg-gray-900/50 rounded border border-gray-600/30 overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <polyline
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="0.5"
            points={points}
            vectorEffect="non-scaling-stroke"
          />
          
          <polygon
            fill="url(#chartGradient)"
            points={`${points} 100,100 0,100`}
          />
        </svg>
        
        <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded px-3 py-1 border border-gray-600/30">
          <div className="text-sm text-gray-400">Current Price</div>
          <div className={`text-lg font-mono font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            ${data.length > 0 ? data[data.length - 1].y.toFixed(6) : '0.000000'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center text-sm">
        <div>
          <div className="text-gray-400">High</div>
          <div className="text-green-400 font-mono">${maxPrice.toFixed(6)}</div>
        </div>
        <div>
          <div className="text-gray-400">Low</div>
          <div className="text-red-400 font-mono">${minPrice.toFixed(6)}</div>
        </div>
        <div>
          <div className="text-gray-400">Volume</div>
          <div className="text-cyan-400 font-mono">{coin.volume24h}</div>
        </div>
        <div>
          <div className="text-gray-400">Change</div>
          <div className={`font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{data.length > 1 ? (((data[data.length - 1].y / data[0].y) - 1) * 100).toFixed(2) : '0.00'}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;