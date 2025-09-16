import React from 'react';
import { Settings, Verified, Calendar } from 'lucide-react';

interface ProfileUser {
    id: number;
    username: string;
    bio?: string;
    joinedDate?: string;
    followingCount?: number;
    followersCount?: number;
    avatarUrl?: string;
    bannerUrl?: string;
}

interface ProfileHeaderProps {
    user: ProfileUser;
    isOwnProfile: boolean;
}

const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {

  const formatJoinedDate = (dateString?: string) => {
    if (!dateString) return 'Date not available';
    return `Joined ${new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
  };
  
  const defaultBanner = 'https://i.imgur.com/lZ2a92h.png'; // A generic banner
  const defaultAvatar = 'https://i.pravatar.cc/150'; // A generic avatar service

  return (
    <section aria-labelledby="profile-heading">
      {/* Sección del Banner y Avatar */}
      <div className="relative">
        <div className="h-48 bg-gray-800">
            <img src={user.bannerUrl || defaultBanner} alt="User banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-[#0D1117] overflow-hidden">
            <img src={user.avatarUrl || defaultAvatar} alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Sección de Información del Perfil */}
      <div className="pt-20 px-4 pb-4">
        {/* Botón de Editar Perfil */}
        <div className="flex justify-end">
          {isOwnProfile && (
            <button 
                onClick={() => window.location.hash = `#/profile/edit`}
                className="flex items-center space-x-2 border border-gray-600 font-bold px-4 py-2 rounded-full transition-colors hover:bg-white/10"
            >
                <Settings size={18} />
                <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Nombre, @usuario y Biografía */}
        <div className="mt-4">
          <h2 id="profile-heading" className="text-2xl font-bold flex items-center">
            {user.username}
            <Verified size={20} className="ml-1 text-neon-green fill-neon-green" aria-label="Verified account" />
          </h2>
          <p className="text-gray-500">@{user.username.toLowerCase()}</p>
        </div>

        <p className="mt-4">{user.bio || 'This user prefers to be mysterious.'}</p>
        
        {/* Fecha de registro y seguidores */}
        <div className="flex items-center space-x-2 text-gray-500 mt-4">
          <Calendar size={16} />
          <span>{formatJoinedDate(user.joinedDate)}</span>
        </div>

        <div className="flex items-center space-x-4 mt-4 text-sm">
          <p>
            <span className="font-bold text-white">{user.followingCount || 0}</span>
            <span className="text-gray-500"> Following</span>
          </p>
          <p>
            <span className="font-bold text-white">{user.followersCount || 0}</span>
            <span className="text-gray-500"> Followers</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;