import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostItem from '../components/PostItem';

// Define a type for the post structure that matches PostItem.tsx
interface Post {
    id: number;
    content: string;
    createdAt: string;
    shareCount: number;
    user: {
        id: number;
        username: string;
        avatarUrl?: string;
    };
    _count: {
        likes: number;
        comments: number;
    };
}

// User interface for logged-in user
interface LoggedInUser {
    id: number;
    username: string;
    avatarUrl?: string;
}

// Mock data for the feed
const mockPosts: Post[] = [
    {
        id: 1,
        content: 'Welcome to the new MemeWatch Social feed! Share your thoughts and alpha. 🚀',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        shareCount: 15,
        user: {
            id: 1,
            username: 'MemeMarketWatchOficial',
            avatarUrl: 'https://i.imgur.com/7gM4M1k.png',
        },
        _count: {
            likes: 120,
            comments: 42,
        },
    },
    {
        id: 2,
        content: 'Just aped into $DOGE2MOON. To the moon or to the dust, we ride at dawn! 🦍💎🙌',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        shareCount: 8,
        user: {
            id: 3,
            username: 'CryptoDegen',
            avatarUrl: 'https://i.pravatar.cc/150?u=degen',
        },
        _count: {
            likes: 256,
            comments: 89,
        },
    },
    {
        id: 3,
        content: 'The underlying technology behind memecoins is fascinating. It demonstrates the power of community and decentralized coordination.',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        shareCount: 22,
        user: {
            id: 2,
            username: 'Vitalik',
            avatarUrl: 'https://i.pravatar.cc/150?u=vitalik',
        },
        _count: {
            likes: 512,
            comments: 128,
        },
    },
];

const SocialHomePage = () => {
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [postContent, setPostContent] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    useEffect(() => {
        // Load user from localStorage to simulate a logged-in session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    // Handler for submitting the post
    const handlePostSubmit = () => {
        if (!postContent.trim() || !loggedInUser) {
            alert('You must be logged in to post.');
            return;
        }

        // Create a new post object
        const newPost: Post = {
            id: Date.now(), // Use timestamp for a unique ID
            content: postContent,
            createdAt: new Date().toISOString(),
            shareCount: 0,
            user: {
                id: loggedInUser.id,
                username: loggedInUser.username,
                avatarUrl: loggedInUser.avatarUrl,
            },
            _count: {
                likes: 0,
                comments: 0,
            },
        };

        // Add the new post to the beginning of the posts array
        setPosts([newPost, ...posts]);

        // Clear the textarea after posting
        setPostContent('');
    };

    return (
        // Sección Central: Feed
        <section className="col-span-2 border-r border-gray-800 max-w-[800px] w-full mx-auto">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
                <h1 className="text-xl font-bold">Inicio</h1>
            </header>
            
            <CreatePost
                postContent={postContent}
                onContentChange={setPostContent}
                onPostSubmit={handlePostSubmit}
            />

            <div className="feed-container">
                {posts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
};

export default SocialHomePage;