
import React from 'react';
import PostItem from './PostItem';

// Expanded mock data for demonstration
const allMockPosts = [
    {
        id: 2,
        content: 'Just aped into $DOGE2MOON. To the moon or to the dust, we ride at dawn! 🦍💎🙌',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        shareCount: 8,
        user: { id: 3, username: 'CryptoDegen', avatarUrl: 'https://i.pravatar.cc/150?u=degen' },
        _count: { likes: 256, comments: 89 },
    },
    {
        id: 3,
        content: 'The underlying technology behind memecoins is fascinating. It demonstrates the power of community and decentralized coordination.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        shareCount: 22,
        user: { id: 2, username: 'Vitalik', avatarUrl: 'https://i.pravatar.cc/150?u=vitalik' },
        _count: { likes: 512, comments: 128 },
    },
    {
        id: 4,
        content: 'I think $PEPE3 is undervalued right now. The community is strong and the chart looks ready for a breakout. NFA.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        shareCount: 5,
        user: { id: 4, username: 'ChartWizard', avatarUrl: 'https://i.pravatar.cc/150?u=wizard' },
        _count: { likes: 310, comments: 95 },
    },
    {
        id: 5,
        content: 'Remember to take profits, degens. Don\'t let greed turn your green bags into red ones.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        shareCount: 30,
        user: { id: 5, username: 'CryptoSensei', avatarUrl: 'https://i.pravatar.cc/150?u=sensei' },
        _count: { likes: 450, comments: 150 },
    },
    {
        id: 1,
        content: 'Welcome to the new MemeWatch Social feed! Share your thoughts and alpha. 🚀',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        shareCount: 15,
        user: { id: 1, username: 'MemeMarketWatchOficial', avatarUrl: 'https://i.imgur.com/7gM4M1k.png' },
        _count: { likes: 120, comments: 42 },
    },
];

const TrendingPostsList = () => {
    // Sort posts by engagement (likes + comments) to simulate "trending"
    const trendingPosts = [...allMockPosts].sort((a, b) => 
        (b._count.likes + b._count.comments) - (a._count.likes + a._count.comments)
    );

    return (
        <div>
            {trendingPosts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default TrendingPostsList;