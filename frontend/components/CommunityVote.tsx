import React from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp, TrendingDown } from 'lucide-react';

interface CommunityVoteProps {
    bullishVotes: number;
    bearishVotes: number;
    userVote: 'bullish' | 'bearish' | null;
    onVote: (vote: 'bullish' | 'bearish') => void;
    isAuthenticated: boolean;
}

const CommunityVote = ({ bullishVotes, bearishVotes, userVote, onVote, isAuthenticated }: CommunityVoteProps) => {
    const totalVotes = bullishVotes + bearishVotes;
    const bullishPercentage = totalVotes > 0 ? (bullishVotes / totalVotes) * 100 : 50;

    return (
        <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-2 text-center">Community Sentiment</h3>
            <p className="text-xs text-gray-400 mb-4 text-center">{totalVotes} total votes</p>
            
            <div className="flex space-x-4 my-4">
                <div className={`flex-1 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center transition-all ${userVote === 'bullish' ? 'ring-2 ring-green-400' : ''}`}>
                    <TrendingUp className="w-8 h-8 mx-auto text-green-400 mb-2" />
                    <p className="text-lg font-bold text-green-400">BULLISH</p>
                    <p className="text-sm text-white">{bullishVotes} votes</p>
                    <p className="text-xs text-gray-400">{bullishPercentage.toFixed(2)}%</p>
                </div>
                <div className={`flex-1 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-center transition-all ${userVote === 'bearish' ? 'ring-2 ring-red-400' : ''}`}>
                    <TrendingDown className="w-8 h-8 mx-auto text-red-400 mb-2" />
                    <p className="text-lg font-bold text-red-400">BEARISH</p>
                    <p className="text-sm text-white">{bearishVotes} votes</p>
                    <p className="text-xs text-gray-400">{(100 - bullishPercentage).toFixed(2)}%</p>
                </div>
            </div>

            <div className="w-full bg-red-500/50 rounded-full h-3 overflow-hidden">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${bullishPercentage}%` }}></div>
            </div>

            {isAuthenticated ? (
                <div className="flex space-x-2 mt-4">
                    <button 
                        onClick={() => onVote('bullish')}
                        className={`w-full flex items-center justify-center font-bold py-2 rounded-lg text-sm transition-all ${userVote === 'bullish' ? 'bg-green-500 text-white ring-2 ring-green-300' : 'bg-green-600/50 hover:bg-green-600/80 text-white'}`}
                    >
                        <ThumbsUp className="w-4 h-4 mr-2" /> Vote Bullish
                    </button>
                    <button 
                        onClick={() => onVote('bearish')}
                        className={`w-full flex items-center justify-center font-bold py-2 rounded-lg text-sm transition-all ${userVote === 'bearish' ? 'bg-red-500 text-white ring-2 ring-red-300' : 'bg-red-600/50 hover:bg-red-600/80 text-white'}`}
                    >
                         <ThumbsDown className="w-4 h-4 mr-2" /> Vote Bearish
                    </button>
                </div>
            ) : (
                <a href="#/login" className="block w-full text-center mt-4 bg-[#30363D] hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm">
                    Login to cast your vote
                </a>
            )}
        </div>
    );
};

export default CommunityVote;