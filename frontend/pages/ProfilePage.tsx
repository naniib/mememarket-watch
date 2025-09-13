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
    bio?: string;
    joinedDate?: string;
    followersCount?: number;
    followingCount?: number;
    avatarUrl?: string;
    bannerUrl?: string;
}

interface PostUser {
    id: number;
    username: string;
    email: string;
}

export interface Post {
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
    const [activeTab, setActiveTab] = useState('Posts'); // State for active tab

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

    const fetchProfileData = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserPosts(id);
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
        // Auth Guard: Redirect if not logged in
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.hash = '#/home';
            return;
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }

        if (userId) {
            fetchProfileData(userId);
        } else {
            setError('User ID not found in URL.');
            setLoading(false);
        }
    }, [userId]);

    const handlePostCreated = (newPost: Post) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const isOwnProfile = loggedInUser && user && loggedInUser.id === user.id;
    
    const renderContent = () => {
        if (loading) return <div className="text-center py-20">Loading profile...</div>;
        if (error) return <div className="text-center py-20 text-red-400">Error: {error}</div>;
        if (!user) return <div className="text-center py-20">User not found.</div>;

        return (
             <>
                <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
                <ProfileNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <main className="px-4">
                    {isOwnProfile && activeTab === 'Posts' && (
                        <div className="my-6">
                            <CreatePostForm onPostCreated={handlePostCreated} />
                        </div>
                    )}
                    
                    {activeTab === 'Posts' && (
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
                    )}
                    
                    {activeTab === 'Replies' && (
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrarán las respuestas de este usuario.</p>
                        </div>
                    )}
                    {activeTab === 'Media' && (
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrará el contenido multimedia de este usuario.</p>
                        </div>
                    )}
                    {activeTab === 'Likes' && ( 
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrarán los posts que este usuario ha marcado como 'Me gusta'.</p>
                        </div>
                    )}
                    {activeTab === 'Notifications' && ( 
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrarán las notificaciones de este usuario.</p>
                        </div>
                    )}
                    {activeTab === 'Settings' && ( 
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrarán las configuraciones del perfil.</p>
                        </div>
                    )}
                    {activeTab === 'Followers' && ( 
                        <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg mt-6">
                            <p className="text-gray-400">Aquí se mostrarán los seguidores de este usuario.</p>
                        </div>
                    )}
                </main>
            </>
        )
    }

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default ProfilePage;