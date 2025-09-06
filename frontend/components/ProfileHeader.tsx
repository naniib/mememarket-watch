import React from 'react';
import { Settings, Verified, Calendar } from 'lucide-react';

const ProfileHeader = () => {
  // Datos de ejemplo como se solicitó para construir el layout.
  const user = {
    username: 'MemeMarketWatchOficial',
    handle: 'mememarketwatchoficial',
    bio: 'Uniting the power of memes with financial education and earnings. Your platform for analyzing the market in a fun way.',
    joinedDate: 'August 2025',
    followingCount: 10,
    followersCount: 10,
    avatarUrl: 'https://i.imgur.com/7gM4M1k.png',
    bannerUrl: 'https://i.imgur.com/4z25m2C.png'
  };

  return (
    <section aria-labelledby="profile-heading">
      {/* Sección del Banner y Avatar */}
      <div className="relative">
        <div className="h-48 bg-gray-800">
            <img src={user.bannerUrl} alt="User banner" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-[#0D1117] overflow-hidden">
            <img src={user.avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Sección de Información del Perfil */}
      <div className="pt-20 px-4 pb-4">
        {/* Botón de Editar Perfil */}
        <div className="flex justify-end">
          <button 
            onClick={() => window.location.hash = '#/profile/edit'}
            className="flex items-center space-x-2 border border-gray-600 font-bold px-4 py-2 rounded-full transition-colors hover:bg-white/10"
          >
              <Settings size={18} />
              <span>Edit Profile</span>
          </button>
        </div>

        {/* Nombre, @usuario y Biografía */}
        <div className="mt-4">
          <h2 id="profile-heading" className="text-2xl font-bold flex items-center">
            {user.username}
            <Verified size={20} className="ml-1 text-cyan-400 fill-cyan-400" aria-label="Verified account" />
          </h2>
          <p className="text-gray-500">@{user.handle}</p>
        </div>

        <p className="mt-4">{user.bio}</p>
        
        {/* Fecha de registro y seguidores */}
        <div className="flex items-center space-x-2 text-gray-500 mt-4">
          <Calendar size={16} />
          <span>Joined {user.joinedDate}</span>
        </div>

        <div className="flex items-center space-x-4 mt-4 text-sm">
          <p>
            <span className="font-bold text-white">{user.followingCount}</span>
            <span className="text-gray-500"> Following</span>
          </p>
          <p>
            <span className="font-bold text-white">{user.followersCount}</span>
            <span className="text-gray-500"> Followers</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;