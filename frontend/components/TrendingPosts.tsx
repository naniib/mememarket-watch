import React from 'react';
import { Search } from 'lucide-react';

const trendingTopics = [
    { category: 'Memecoins · Trending', topic: '#DogeToTheMoon', posts: '12.1K posts' },
    { category: 'Technology · Trending', topic: '#SolanaSummer', posts: '8,456 posts' },
    { category: 'Memecoins · Trending', topic: '$PEPE', posts: '22.3K posts' },
    { category: 'News · Trending', topic: 'SEC Regulations', posts: '5,123 posts' },
    { category: 'Gaming · Trending', topic: '#Web3Gaming', posts: '3,876 posts' },
];

const TrendingPosts = () => {
    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search on MemeWatch"
                    className="w-full bg-[#161B22] border border-[#30363D] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neon-green"
                />
            </div>

            {/* Trending Card */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl">
                <h3 className="text-xl font-bold p-4">What's Happening</h3>
                <div className="px-4 pb-2">
                    {trendingTopics.map((item, index) => (
                        <div key={index} className="p-3 mb-2 rounded-lg hover:bg-neon-blue/10 transition-colors cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                    <p className="font-bold text-white">{item.topic}</p>
                                    <p className="text-xs text-gray-500">{item.posts}</p>
                                </div>
                                <div className="text-gray-500 hover:text-neon-blue">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <a href="#/trending" className="text-neon-blue text-sm hover:underline">Show more</a>
                </div>
            </div>
        </div>
    );
};

export default TrendingPosts;