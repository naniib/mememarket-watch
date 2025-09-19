import React, { useState, useEffect } from 'react';
import { Home, User, Search, Trophy, LogOut, Swords, Newspaper, LineChart, PenSquare, LogIn, Zap } from 'lucide-react';

interface User {
    id: number;
    username: string;
    avatarUrl?: string;
}

interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    text: string;
    isActive: boolean;
}

const NavLink = ({ href, icon: Icon, text, isActive }: NavLinkProps) => {
    // ### CAMBIO 1: Usamos la clase estándar de Tailwind para el color y la sombra ###
    const baseClasses = 'flex items-center space-x-4 px-4 py-3 rounded-full transition-colors duration-200 text-xl';
    const activeClasses = 'bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-400/50';
    const inactiveClasses = 'text-gray-300 hover:bg-gray-800 hover:text-white';
    
    return (
        <a href={href} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <Icon className="w-7 h-7" />
            <span>{text}</span>
        </a>
    );
};

interface SideNavProps {
    user: User | null;
    onLogout: () => void;
    onConnectClick: () => void;
    onCreatePostClick: () => void;
}

const SideNav = ({ user, onLogout, onConnectClick, onCreatePostClick }: SideNavProps) => {
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        const getPathFromHash = () => window.location.hash.split('?')[0] || '#/home';
        setActivePath(getPathFromHash());
        const onHashChange = () => setActivePath(getPathFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const allNavLinks = [
        { text: 'Inicio', href: '#/home', icon: Home, requiresAuth: false },
        { text: 'Perfil', href: user ? `#/profile/${user.id}` : '#/profile', icon: User, requiresAuth: true },
        { text: 'Radar', href: '#/explore', icon: Search, requiresAuth: false },
        { text: 'Meme Battles', href: '#/battles', icon: Swords, requiresAuth: false },
        { text: 'MemePress & Humor', href: '#/memepress', icon: Newspaper, requiresAuth: false },
        { text: 'Fidelity', href: '#/fidelity', icon: Trophy, requiresAuth: true },
    ];

    const navLinks = allNavLinks.filter(link => !link.requiresAuth || !!user);

    return (
        <div className="flex flex-col justify-between h-full py-4">
            <div>
                {user ? (
                    <div className="mb-4 px-2">
                        <a href={`#/profile/${user.id}`} className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-800">
                            <img src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="text-left flex-grow truncate">
                                <p className="font-bold truncate">{user.username}</p>
                                <p className="text-sm text-gray-400 truncate">@{user.username.toLowerCase()}</p>
                            </div>
                        </a>
                    </div>
                ) : (
                    <div className="mb-4 px-2">
                        {/* ### CAMBIO 2: Usamos la clase estándar ### */}
                        <button onClick={onCreatePostClick} className="w-full flex items-center justify-center space-x-2 text-lg font-bold py-3 px-4 rounded-lg bg-emerald-400 text-black hover:opacity-90 transition-opacity">
                            <Zap className="w-6 h-6" />
                            <span>Connect</span>
                        </button>
                    </div>
                )}

                <nav className="flex flex-col space-y-2">
                    {navLinks.map(item => (
                        <NavLink key={item.text} {...item} isActive={activePath === item.href} />
                    ))}
                </nav>
            </div>

            <div className="flex flex-col space-y-4">
                {user ? (
                    <button onClick={onLogout} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-300 text-xl w-full">
                        <LogOut className="w-7 h-7" />
                        <span>Cerrar sesión</span>
                    </button>
                ) : (
                    <button onClick={onConnectClick} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-300 text-xl w-full">
                        <LogIn className="w-7 h-7" />
                        <span>Iniciar Sesión</span>
                    </button>
                )}
                <div className="space-y-4">
                    {/* ### CAMBIO 3: Usamos clases estándar ### */}
                    <a
                        href="#/"
                        className="w-full text-lg font-bold py-3 px-4 rounded-lg text-center bg-emerald-400 hover:opacity-90 transition-all text-black flex items-center justify-center space-x-2 shadow-lg shadow-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/70"
                    >
                        <LineChart className="w-6 h-6" />
                        <span>MemeMarket</span>
                    </a>
                    {/* ### CAMBIO 4: Usamos clases estándar ### */}
                    <button 
                        onClick={user ? () => { alert('Open create post modal/page'); } : onCreatePostClick}
                        className="w-full text-lg text-black font-bold py-3 rounded-lg bg-emerald-400 hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/70"
                    >
                        <PenSquare className="w-6 h-6" />
                        <span>Crear publicación</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideNav;