import React from 'react';
import { Verified, MessageCircle, Repeat, Heart, Upload } from 'lucide-react';

// FIX: Corrected Post interface to match data structure from the API.
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

const PostItem = ({ post }: { post: Post }) => {
    
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m";
        return Math.floor(seconds) + "s";
    };

    const userInitial = post.user.username.charAt(0).toUpperCase();

    return (
        <article className="p-4 border-b border-gray-800 hover:bg-black/20 transition-colors cursor-pointer">
            <div className="flex space-x-4">
                <a href={`#/profile/${post.user.id}`} className="flex-shrink-0">
                    {post.user.avatarUrl ? (
                        <img src={post.user.avatarUrl} alt={post.user.username} className="w-12 h-12 rounded-full" />
                    ) : (
                         <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white text-xl">
                            {userInitial}
                        </div>
                    )}
                </a>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <a href={`#/profile/${post.user.id}`} className="font-bold text-white hover:underline">{post.user.username}</a>
                        <Verified size={16} className="text-[#00f5b3] fill-[#00f5b3] drop-shadow-[0_0_5px_rgba(0,245,179,0.7)]" />
                        <span className="text-sm text-gray-500">· {formatTimeAgo(post.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 mt-1 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex items-center justify-between text-gray-500 mt-4 max-w-sm">
                        <button onClick={() => console.log('Botón Comentar presionado')} className="flex items-center space-x-2 hover:text-[#00f5b3]">
                            <MessageCircle size={18} />
                            <span>{post._count.comments}</span>
                        </button>
                        <button onClick={() => console.log('Botón Repost presionado')} className="flex items-center space-x-2 hover:text-green-400">
                            <Repeat size={18} />
                            <span>{post.shareCount}</span>
                        </button>
                        <button onClick={() => console.log('Botón Me Gusta presionado')} className="flex items-center space-x-2 hover:text-pink-400">
                            <Heart size={18} />
                            <span>{post._count.likes}</span>
                        </button>
                        <button onClick={() => console.log('Botón Compartir presionado')} className="hover:text-[#00f5b3]">
                            <Upload size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostItem;