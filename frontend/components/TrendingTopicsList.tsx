
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const trendingTopicsData = [
    { rank: 1, category: 'Memecoins · Trending', topic: '#DogeToTheMoon', posts: '12.1K posts' },
    { rank: 2, category: 'Technology · Trending', topic: '#SolanaSummer', posts: '8,456 posts' },
    { rank: 3, category: 'Memecoins · Trending', topic: '$PEPE', posts: '22.3K posts' },
    { rank: 4, category: 'News · Trending', topic: 'SEC Regulations', posts: '5,123 posts' },
    { rank: 5, category: 'Gaming · Trending', topic: '#Web3Gaming', posts: '3,876 posts' },
    { rank: 6, category: 'Finance · Trending', topic: '#DeFi', posts: '7,500 posts' },
    { rank: 7, category: 'Memecoins · Trending', topic: '$WIF', posts: '18.9K posts' },
];

const TrendingTopicsList = () => {
    return (
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-800">
                {trendingTopicsData.map((item) => (
                    <li key={item.topic} className="px-4 py-3 hover:bg-emerald-400/10 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <span className="text-sm font-bold text-gray-500">{item.rank}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400">{item.category}</p>
                                <p className="text-base font-bold text-white truncate">{item.topic}</p>
                                <p className="text-sm text-gray-500 truncate">{item.posts}</p>
                            </div>
                            <div>
                                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-800 hover:text-white">
                                    <span className="sr-only">More options for {item.topic}</span>
                                    <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingTopicsList;