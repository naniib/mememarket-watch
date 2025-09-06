import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import { getUserPosts } from '../api';
import ProfileHeader from '../components/ProfileHeader';
import ProfileNavTabs from '../components/ProfileNavTabs'; // Import the new component

// Define interfaces for the data structures
interface ProfileUser {
    id: number;
    username: string;
    email: string;
    fidelity_points: number;
}

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

const ProfilePage = () => {
    const [user, setUser] = useState<ProfileUser | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<{ id: number } | null>(null);

    const getUserIdFromHash = () => {
        const path = window.location.hash.substring(1); // Remove '#'
        const parts = path.split('/');
        // Expects a path like '/profile/123', so parts will be ['', 'profile', '123']
        if (parts[1] === 'profile' && parts[2]) {
            return parts[2];
        }
        return null;
    };
    
    const userId = getUserIdFromHash();

    const fetchProfileData = async () => {
        if (!userId) {
            setError('User ID not found in URL.');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getUserPosts(userId);
            if (data.success) {
                setUser(data.user);
                setPosts(data.posts);
            } else {
                throw new Error('Failed to fetch profile data.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
        fetchProfileData();
    }, [userId]);

    const isOwnProfile = loggedInUser && user && loggedInUser.id === user.id;
    
    const renderContent = () => {
        if (loading) return <div className="text-center py-20">Loading profile...</div>;
        if (error) return <div className="text-center py-20 text-red-400">Error: {error}</div>;
        if (!user) return <div className="text-center py-20">User not found.</div>;

        return (
             <>
                <ProfileHeader />
                <ProfileNavTabs />

                <main className="px-4">
                    {isOwnProfile && (
                        <div className="my-6">
                            <CreatePostForm onPostCreated={fetchProfileData} />
                        </div>
                    )}
                    
                    {/* The list of posts now appears below the tabs */}
                    <div className="mt-6">
                        {posts.length > 0 ? (
                            <div className="space-y-4">
                                {posts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg">
                                <p className="text-gray-400">This user hasn't posted anything yet.</p>
                            </div>
                        )}
                    </div>
                </main>
            </>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {renderContent()}
        </div>
    );
};

export default ProfilePage;