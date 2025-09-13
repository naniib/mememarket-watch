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
    const activeClass = isActive ? 'font-bold bg-[#1D2127]' : 'text-gray-400';
    return (
        <a href={href} className={`flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-xl ${activeClass}`}>
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
                         <a href={`#/profile/${user.id}`} className="flex items-center space-x-3 p-2 rounded-full hover:bg-[#1D2127]">
                            <img src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="text-left flex-grow truncate">
                                <p className="font-bold truncate">{user.username}</p>
                                <p className="text-sm text-gray-400 truncate">@{user.username.toLowerCase()}</p>
                            </div>
                        </a>
                    </div>
                ) : (
                     <div className="mb-4 px-2">
                        <button onClick={onCreatePostClick} className="w-full flex items-center justify-center space-x-2 text-lg font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity text-white">
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
                     <button onClick={onLogout} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-gray-400 text-xl w-full">
                        <LogOut className="w-7 h-7" />
                        <span>Cerrar sesión</span>
                    </button>
                ) : (
                    <button onClick={onConnectClick} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-gray-400 text-xl w-full">
                        <LogIn className="w-7 h-7" />
                        <span>Iniciar Sesión</span>
                    </button>
                )}
                <div className="space-y-4">
                    <a
                        href="#/"
                        className="w-full text-lg font-bold py-3 px-4 rounded-lg text-center bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-colors text-white flex items-center justify-center space-x-2"
                    >
                        <LineChart className="w-6 h-6" />
                        <span>MemeMarket</span>
                    </a>
                    <button 
                        onClick={user ? () => { /* Logic for logged in user */ alert('Open create post modal/page'); } : onCreatePostClick}
                        className="w-full text-lg text-white font-bold py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
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