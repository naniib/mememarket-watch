import React, { useState, useEffect } from 'react';
import { Home, User, Search, Trophy, LogOut, Swords, Newspaper, LineChart, PenSquare, LogIn, Zap, BarChart2 } from 'lucide-react';
import { useAuth } from '../App';

interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    text: string;
    isActive: boolean;
}

const NavLink = ({ href, icon: Icon, text, isActive }: NavLinkProps) => {
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
    onConnectClick: () => void;
    onCreatePostClick: () => void;
    onOpenJoinCommunityModal: () => void;
}

const SideNav = ({ onConnectClick, onCreatePostClick, onOpenJoinCommunityModal }: SideNavProps) => {
    const { user, logout } = useAuth();
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        const getPathFromHash = () => window.location.hash.split('?')[0] || '#/home';
        
        const updateActivePath = () => {
            const path = getPathFromHash();
            // Special handling for profile pages
            if (path.startsWith('#/profile/')) {
                 // Check if it's the current user's profile
                if(user && path === `#/profile/${user.id}`) {
                    setActivePath('#/profile');
                } else {
                    // It's another user's profile, so don't highlight the nav link
                    setActivePath(path); 
                }
            } else {
                setActivePath(path);
            }
        };

        updateActivePath();
        window.addEventListener('hashchange', updateActivePath);
        return () => window.removeEventListener('hashchange', updateActivePath);
    }, [window.location.hash, user]); // Re-run when hash or user changes

    const allNavLinks = [
        { text: 'Inicio', href: '#/home', icon: Home, requiresAuth: false },
        { text: 'Perfil', href: '#/profile', icon: User, requiresAuth: true },
        { text: 'Radar', href: '#/explore', icon: Search, requiresAuth: false },
        { text: 'Meme Battles', href: '#/battles', icon: Swords, requiresAuth: false },
        { text: 'MemePress & Humor', href: '#/memepress', icon: Newspaper, requiresAuth: false },
        { text: 'Trending', href: '#/trending', icon: BarChart2, requiresAuth: false },
        { text: 'Fidelity', href: '#/fidelity', icon: Trophy, requiresAuth: true },
    ];

    const navLinks = allNavLinks.filter(link => !link.requiresAuth || !!user);

    // Determine the correct href for the profile link
    const profileHref = user ? `#/profile/${user.id}` : '#/profile';

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
                    <div className="px-2 mb-4">
                        <button 
                            onClick={onOpenJoinCommunityModal}
                            className="w-full text-lg text-black font-bold py-3 rounded-lg bg-emerald-400 hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/70"
                        >
                            <Zap className="w-6 h-6" />
                            <span>Connect</span>
                        </button>
                    </div>
                )}

                <nav className="flex flex-col space-y-2">
                    {navLinks.map(item => {
                        const href = item.text === 'Perfil' ? profileHref : item.href;
                        return (
                            <NavLink 
                                key={item.text} 
                                {...item}
                                href={href} 
                                isActive={activePath === item.href}
                            />
                        )
                    })}
                </nav>
            </div>

            <div className="flex flex-col space-y-4">
                {user ? (
                    <button onClick={logout} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-300 text-xl w-full">
                        <LogOut className="w-7 h-7" />
                        <span>Cerrar sesión</span>
                    </button>
                ) : (
                    <button onClick={onConnectClick} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 text-gray-300 text-xl w-full">
                        <LogIn className="w-7 h-7" />
                        <span>Iniciar Sesión</span>
                    </button>
                )}
                
                <a 
                    href="#/"
                    className="w-full text-lg text-black font-bold py-3 rounded-lg bg-emerald-400 hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/70"
                >
                    <LineChart className="w-6 h-6" />
                    <span>MemeMarket</span>
                </a>

                <button 
                    onClick={onCreatePostClick}
                    className="w-full text-lg text-black font-bold py-3 rounded-lg bg-emerald-400 hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/70"
                >
                    <PenSquare className="w-6 h-6" />
                    <span>Crear publicación</span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;