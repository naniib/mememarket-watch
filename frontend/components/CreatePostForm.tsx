import React, { useState } from 'react';
import { createPost } from '../api';

interface CreatePostFormProps {
    onPostCreated: () => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!content.trim()) {
            setError('Post content cannot be empty.');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('You must be logged in to post.');
            }

            await createPost({ content }, token);
            
            setContent('');
            onPostCreated(); // Callback to refresh the posts list

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-4">Create a new post</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white text-sm h-24 resize-none"
                    disabled={loading}
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        onClick={() => alert('Publicando post desde el perfil...')}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading || !content.trim()}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePostForm;