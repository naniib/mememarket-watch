import React from 'react';

// Define interfaces for the data structures
interface PostUser {
    id: number;
    username: string;
    email: string;
}

interface Post {
    id: number;
    content: string;
    createdAt: string;
    shareCount: number;
    user: PostUser;
    _count: {
        likes: number;
        comments: number;
    };
}

const LikeIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333V17a1 1 0 001 1h6.364a1 1 0 00.942-.671l1.7-6.805A1 1 0 0015 9V6.5a1.5 1.5 0 00-1.5-1.5h-2.504a1.5 1.5 0 01-1.42-1.034L8.53 1.667A1 1 0 007.536 1H7a1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L4.5 8" /></svg>;
const CommentIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.239A8.99 8.99 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.707 11.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L7 12.586l-1.293-1.293z" clipRule="evenodd" /></svg>;
const ShareIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>;


const PostCard = ({ post }: { post: Post }) => {
    
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 transition-all duration-200 hover:border-neon-green">
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-neon-green to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">{post.user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                        <a href={`#/profile/${post.user.id}`} className="font-bold text-white hover:underline">{post.user.username}</a>
                        <span className="text-sm text-gray-500">&middot;</span>
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                    </div>
                    <p className="text-gray-300 mt-2 whitespace-pre-wrap">{post.content}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-400 mt-4">
                        <button className="flex items-center space-x-1.5 hover:text-neon-green">
                            <LikeIcon /> <span>{post._count.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 hover:text-neon-green">
                            <CommentIcon /> <span>{post._count.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1.5 hover:text-neon-green">
                            <ShareIcon /> <span>{post.shareCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;