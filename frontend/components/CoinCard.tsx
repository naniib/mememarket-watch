import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import type { Coin } from '../data';

interface CoinCardProps {
  coin: Coin;
  rank: number;
  category: string;
  onClick: () => void;
  isAuthenticated: boolean;
}

const CoinCard = ({ coin, rank, category, onClick, isAuthenticated }: CoinCardProps) => {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const getCategoryStyles = () => {
    switch (category) {
      case 'hot': return {
        border: 'border-red-400/30',
        hoverBorder: 'hover:border-red-400/60',
        shadow: 'hover:shadow-red-500/10',
        rankBg: 'bg-red-500/10 text-red-300',
      };
      case 'warm': return {
        border: 'border-yellow-400/30',
        hoverBorder: 'hover:border-yellow-400/60',
        shadow: 'hover:shadow-yellow-500/10',
        rankBg: 'bg-yellow-500/10 text-yellow-300',
      };
      case 'cold': return {
        border: 'border-blue-400/30',
        hoverBorder: 'hover:border-blue-400/60',
        shadow: 'hover:shadow-blue-500/10',
        rankBg: 'bg-blue-500/10 text-blue-300',
      };
      default: return {
        border: 'border-gray-600/30',
        hoverBorder: 'hover:border-gray-500/60',
        shadow: 'hover:shadow-gray-500/10',
        rankBg: 'bg-gray-700/50 text-gray-300',
      };
    }
  };

  const riskColor = {
    LOW: 'text-green-400',
    MEDIUM: 'text-yellow-400',
    HIGH: 'text-red-400',
  }[coin.riskLevel];
  
  const styles = getCategoryStyles();
  const isPositive = coin.change24h > 0;

  const handleVote = (e: React.MouseEvent, type: 'up' | 'down') => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    setVoted(voted === type ? null : type);
  };

  return (
    <div 
      className={`relative bg-black/50 backdrop-blur-sm border ${styles.border} ${styles.hoverBorder} ${styles.shadow} rounded-xl p-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
      onClick={onClick}
      aria-labelledby={`coin-name-${coin.id}`}
    >
      {/* Top section: Rank, Logo, Name, Symbol */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${styles.rankBg}`}>
            #{rank}
          </div>
          <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-xl">
            {coin.emoji}
          </div>
          <div>
            <h3 id={`coin-name-${coin.id}`} className="flex items-center gap-x-1.5 font-bold text-white">
              <span>{coin.name}</span>
              {coin.boosted && <Zap size={16} className="text-yellow-400 animate-pulse" />}
            </h3>
            <p className="text-sm text-gray-400">${coin.symbol}</p>
          </div>
        </div>
      </div>
      
      {/* Middle section: Price and Change */}
      <div className="flex justify-between items-center bg-gray-800/30 rounded-lg p-2 mb-3">
        <div>
          <span className="text-xs text-gray-400">Price</span>
          <p className="text-lg font-mono font-semibold text-white">${coin.price.toFixed(6)}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400">24h Change</span>
          <div className={`flex items-center justify-end space-x-1 text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{coin.change24h.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom section: Stats and Votes */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <span className="text-gray-500">MC: </span>
            <span className="font-mono text-gray-300">{coin.marketCap}</span>
          </div>
          <div>
            <span className="text-gray-500">Vol: </span>
            <span className="font-mono text-gray-300">{coin.volume24h}</span>
          </div>
          <div className="flex items-center gap-x-1.5">
              <span className="text-gray-500">Risk:</span>
              <span className={`font-semibold ${riskColor}`}>{coin.riskLevel}</span>
          </div>
           <div className="flex items-center space-x-3 justify-self-end">
            <button
              onClick={(e) => handleVote(e, 'up')}
              disabled={!isAuthenticated}
              aria-label={isAuthenticated ? "Vote up" : "Login to vote"}
              title={isAuthenticated ? "Vote up" : "Login to vote"}
              className={`flex items-center gap-x-1 transition-colors ${
                voted === 'up' 
                  ? 'text-green-400' 
                  : 'text-gray-400 hover:text-green-400'
              } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp size={12} />
              <span className="font-semibold">{coin.upvotes}</span>
            </button>
            <button
              onClick={(e) => handleVote(e, 'down')}
              disabled={!isAuthenticated}
              aria-label={isAuthenticated ? "Vote down" : "Login to vote"}
              title={isAuthenticated ? "Vote down" : "Login to vote"}
              className={`flex items-center gap-x-1 transition-colors ${
                voted === 'down' 
                  ? 'text-red-400' 
                  : 'text-gray-400 hover:text-red-400'
              } ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsDown size={12} />
              <span className="font-semibold">{coin.downvotes}</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default CoinCard;