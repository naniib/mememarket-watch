
import React, { useState, useEffect } from 'react';

// Define the user interface
interface User {
    id: number;
    username: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
    bannerUrl?: string;
}

const EditProfilePage = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);
            setUsername(user.username);
            setEmail(user.email);
            setBio(user.bio || '');
            setWebsite((user as any).website || ''); 
            setLocation((user as any).location || '');
        }
        setLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Guardando cambios del Puesto de Mando...');
    };

    if (loading && !loggedInUser) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!loggedInUser) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-400 mb-4">Please log in to edit your profile.</p>
                <a href="#/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                    Go to Login
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex items-center mb-6">
                <a href={`#/profile/${loggedInUser.id}`} className="text-sm text-cyan-400 hover:underline flex items-center">
                    &larr; Volver al Perfil
                </a>
            </div>
            
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Puesto de Mando
            </h1>

            <form onSubmit={handleSubmit}>
                {/* Nivel de Perfil Card */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Nivel de Perfil</h2>
                    <div className="w-full bg-gray-700/50 rounded-full h-4 border border-gray-600 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <p className="text-cyan-400 mt-3 text-center text-sm">
                        ¡Completa tu perfil para ganar +50 Puntos de Fidelidad!
                    </p>
                </div>

                {/* Información Básica Card */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 mt-6">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Información Básica</h2>
                    <div className="space-y-6">
                        {/* Avatar */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Avatar / Foto de Perfil</label>
                            <div className="flex items-center space-x-4">
                                <img src={loggedInUser.avatarUrl || 'https://via.placeholder.com/80'} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-600" />
                                <div className="flex space-x-2">
                                    <button type="button" onClick={() => alert('Función de subir/eliminar avatar pendiente...')} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Cambiar</button>
                                    <button type="button" onClick={() => alert('Función de subir/eliminar avatar pendiente...')} className="bg-red-800/50 hover:bg-red-800/80 text-red-300 font-bold py-2 px-4 rounded-lg text-sm">Eliminar</button>
                                </div>
                            </div>
                        </div>
                        {/* Cover Photo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Foto de Portada</label>
                            <div className="h-40 bg-gray-800 border-2 border-dashed border-[#30363D] rounded-lg flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loggedInUser.bannerUrl || ''})` }}>
                                {!loggedInUser.bannerUrl && <p className="text-gray-500 text-sm mb-2">No cover image</p>}
                                <button type="button" onClick={() => alert('Función de subir portada pendiente...')} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg text-sm">Subir</button>
                            </div>
                        </div>
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">Nombre de Usuario</label>
                            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
                        </div>
                        {/* Bio */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                            <textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none" />
                        </div>
                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-2">Sitio Web</label>
                            <input id="website" type="url" placeholder="https://your-website.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
                        </div>
                        {/* Email */}
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
                        </div>
                        {/* Location */}
                         <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-2">Ubicación</label>
                            <input id="location" type="text" placeholder="e.g., The Moon" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white" />
                        </div>
                    </div>
                </div>

                {/* Apariencia y Arsenal Personal Card */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 mt-6">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Apariencia y Arsenal Personal</h2>
                    <div className="space-y-8">
                        {/* Meme Vitrina */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Meme Vitrina (Showcase de Tokens)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 text-center space-y-3">
                                    <p className="text-gray-400">Memecoin Favorita</p>
                                    <div className="h-16 flex items-center justify-center text-gray-600">[No seleccionada]</div>
                                    <button type="button" onClick={() => alert('Función de selección de token/NFT pendiente...')} className="w-full bg-yellow-600/50 hover:bg-yellow-600/80 text-yellow-200 font-bold py-2 px-4 rounded-lg text-sm">Seleccionar Memecoin</button>
                                </div>
                                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 text-center space-y-3">
                                    <p className="text-gray-400">NFT de Perfil</p>
                                    <div className="h-16 flex items-center justify-center text-gray-600">[No seleccionado]</div>
                                    <button type="button" onClick={() => alert('Función de selección de token/NFT pendiente...')} className="w-full bg-purple-600/50 hover:bg-purple-600/80 text-purple-200 font-bold py-2 px-4 rounded-lg text-sm">Seleccionar NFT</button>
                                </div>
                            </div>
                        </div>
                        {/* Tus Insignias de Degen */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Tus Insignias de Degen</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { name: "Cazador de Gemas", emoji: "💎" },
                                    { name: "Hodler Épico", emoji: "🙌" },
                                    { name: "Moon Commander", emoji: "🚀" },
                                    { name: "OG Degen", emoji: "🦍" }
                                ].map((badge, i) => (
                                    <div key={i} className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4 flex flex-col items-center justify-between space-y-2">
                                        <span className="text-5xl">{badge.emoji}</span>
                                        <span className="text-xs font-bold text-white text-center">{badge.name}</span>
                                        <button type="button" onClick={() => alert('Función de mostrar insignia pendiente...')} className="text-xs bg-cyan-800 text-cyan-200 px-3 py-1 rounded w-full hover:bg-cyan-700">Mostrar</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacidad y Seguridad Card */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 mt-6">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-3">Privacidad y Seguridad</h2>
                    <p className="text-gray-400">
                        Gestiona quién puede ver tu actividad y tus datos. Próximamente: Autenticación de dos factores, control de visibilidad de posts, y más. ¡Tu seguridad es nuestra prioridad!
                    </p>
                </div>
                
                {/* Save Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center text-lg font-bold py-4 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span role="img" aria-label="rocket" className="mr-2 animate-pulse">🚀</span>
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;