import React, { useState } from 'react';
import { TrendingUp, Heart, MessageCircle } from 'lucide-react';

// Mock Data for trending posts
const trendingPostsData = [
    {
        rank: 1,
        avatar: 'https://i.pravatar.cc/40?u=captain',
        username: 'Captain_Hindsight',
        content: 'Real Degens keep hodlin!',
        likes: 12,
        comments: 0,
    },
    {
        rank: 2,
        avatarInitial: 'J',
        username: 'JONS_PLANET',
        content: 'DEGENIN Not just a token, but a cult',
        likes: 10,
        comments: 0,
    },
    {
        rank: 3,
        avatar: 'https://i.pravatar.cc/40?u=something',
        username: 'SomeThing',
        content: 'I hope everyone had/will have a great day today.',
        likes: 10,
        comments: 0,
    },
    {
        rank: 4,
        avatarInitial: 'J',
        username: 'JONS_PLANET',
        content: 'DEGENIN is improving every day, and I would like to thank th...',
        likes: 8,
        comments: 0,
    },
    {
        rank: 5,
        avatar: 'https://i.pravatar.cc/40?u=satoshi',
        username: 'Satoshi nakamoto',
        content: 'we are a united community. dear comrades. i bought more $Deg...',
        likes: 8,
        comments: 1,
    }
];

const TrendingPosts = () => {
    const [activeFilter, setActiveFilter] = useState('1h');

    return (
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 text-white w-full">
            {/* Header */}
            <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-lg font-bold">Trending Posts</h2>
            </div>

            {/* Time Filters */}
            <div className="flex bg-[#0D1117] rounded-lg p-1 mb-4">
                {['1h', '24h', '7d'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                            activeFilter === filter
                                ? 'bg-[#30363D] text-white'
                                : 'text-gray-400 hover:bg-[#30363D]/50'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Posts List */}
            <ul className="space-y-4 mb-4">
                {trendingPostsData.map(post => (
                    <li key={post.rank} className="flex items-start space-x-3">
                        <span className="text-gray-500 font-semibold text-sm pt-2">{post.rank}</span>
                        <div className="flex-shrink-0">
                            {post.avatar ? (
                                <img src={post.avatar} alt={`${post.username} avatar`} className="w-10 h-10 rounded-full" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-lg">
                                    {post.avatarInitial}
                                </div>
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="font-bold text-sm truncate">{post.username}</p>
                            <p className="text-gray-400 text-sm truncate">{post.content}</p>
                            <div className="flex items-center space-x-4 text-gray-500 mt-1">
                                <div className="flex items-center space-x-1 text-xs">
                                    <Heart size={14} />
                                    <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-xs">
                                    <MessageCircle size={14} />
                                    <span>{post.comments}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Footer Link */}
            <a href="#" className="block text-center text-sm text-cyan-400 hover:underline">
                View all trending
            </a>
        </div>
    );
};

export default TrendingPosts;