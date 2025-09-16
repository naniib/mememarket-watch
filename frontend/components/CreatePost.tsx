import React, { useState, useEffect } from 'react';
import { Image, Smile } from 'lucide-react';

interface CreatePostProps {
    postContent: string;
    onContentChange: (newContent: string) => void;
    onPostSubmit: () => void;
}

const CreatePost = ({ postContent, onContentChange, onPostSubmit }: CreatePostProps) => {
    const [user, setUser] = useState<{ username: string, avatarUrl?: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const userInitial = user ? user.username.charAt(0).toUpperCase() : 'A';

    return (
        <div className="p-4 border-b border-gray-800">
            <div className="flex space-x-4">
                 {user && user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full" />
                ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-xl">
                        {userInitial}
                    </div>
                )}
                <div className="flex-1">
                    <label htmlFor="post-input" className="sr-only">¿Qué estás pensando?</label>
                    <textarea
                        id="post-input"
                        placeholder="¿Qué estás pensando?"
                        className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none resize-none"
                        rows={2}
                        aria-label="Create a new post"
                        value={postContent}
                        onChange={(e) => onContentChange(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-4 text-[#00f5b3]">
                            <button onClick={() => alert('Funcionalidad de añadir foto no implementada')} className="hover:bg-[#00f5b3]/10 p-2 rounded-full transition-all hover:[&>svg]:drop-shadow-[0_0_3px_#00f5b3]"><Image size={20} /></button>
                            <button onClick={() => alert('Funcionalidad de añadir emoji no implementada')} className="hover:bg-[#00f5b3]/10 p-2 rounded-full transition-all hover:[&>svg]:drop-shadow-[0_0_3px_#00f5b3]"><Smile size={20} /></button>
                        </div>
                        <button 
                            onClick={onPostSubmit}
                            className="bg-[#00f5b3] hover:bg-opacity-90 text-black font-bold py-2 px-4 rounded-full text-sm transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(0,245,179,0.7)] hover:shadow-[0_0_15px_rgba(0,245,179,0.9)]"
                            disabled={!postContent.trim()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;