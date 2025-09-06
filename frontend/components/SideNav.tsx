import React, { useState, useEffect } from 'react';
import { Home, User, Search, Trophy, LogOut, Swords, Newspaper, LineChart, PenSquare, LogIn } from 'lucide-react';

// Interfaz para las propiedades de cada enlace
interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    text: string;
    isActive: boolean;
}

// Componente para cada enlace del menú
const NavLink = ({ href, icon: Icon, text, isActive }: NavLinkProps) => {
    const activeClass = isActive ? 'font-bold bg-[#1D2127]' : 'text-gray-400';
    return (
        <a href={href} className={`flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-xl ${activeClass}`}>
            <Icon className="w-7 h-7" />
            <span>{text}</span>
        </a>
    );
};

// Componente principal de la barra lateral
const SideNav = () => {
    const [user, setUser] = useState<{ id: number, username: string } | null>(null);
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        // Cargar usuario desde localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // Lógica para marcar el enlace activo
        const getPathFromHash = () => window.location.hash.split('?')[0] || '#/home';
        setActivePath(getPathFromHash());
        const onHashChange = () => setActivePath(getPathFromHash());
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // La lista correcta de enlaces
    const navLinks = [
        { text: 'Inicio', href: '#/home', icon: Home },
        { text: 'Perfil', href: user ? `#/profile/${user.id}` : '#/profile', icon: User },
        { text: 'Radar', href: '#/explore', icon: Search },
        { text: 'Meme Battles', href: '#/battles', icon: Swords },
        { text: 'MemePress & Humor', href: '#/memepress', icon: Newspaper },
        { text: 'Fidelity', href: '#/fidelity', icon: Trophy },
    ];

    return (
        <div className="flex flex-col justify-between h-full py-4">
            
            {/* Parte Superior: Perfil y Navegación */}
            <div>
                {user && (
                    <div className="mb-4 px-2">
                         <a href={`#/profile/${user.id}`} className="flex items-center space-x-3 p-2 rounded-full hover:bg-[#1D2127]">
                            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold">{user.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="text-left flex-grow truncate">
                                <p className="font-bold truncate">{user.username}</p>
                                <p className="text-sm text-gray-400 truncate">@{user.username.toLowerCase()}</p>
                            </div>
                        </a>
                    </div>
                )}

                <nav className="flex flex-col space-y-2">
                    {navLinks.map(item => (
                        <NavLink key={item.text} {...item} isActive={activePath === item.href} />
                    ))}
                </nav>
            </div>

            {/* Parte Inferior: Botones de Acción */}
            <div className="flex flex-col space-y-4">
                {user ? (
                     <button onClick={handleLogout} className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-gray-400 text-xl w-full">
                        <LogOut className="w-7 h-7" />
                        <span>Cerrar sesión</span>
                    </button>
                ) : (
                    <a href="#/login" className="flex items-center space-x-4 px-4 py-3 rounded-full hover:bg-[#1D2127] transition-colors duration-200 text-gray-400 text-xl w-full">
                        <LogIn className="w-7 h-7" />
                        <span>Iniciar Sesión</span>
                    </a>
                )}
                <div className="space-y-4">
                    <a
                        href="#/"
                        className="w-full text-lg font-bold py-3 px-4 rounded-lg text-center bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 transition-colors text-white flex items-center justify-center space-x-2"
                    >
                        <LineChart className="w-6 h-6" />
                        <span>MemeMarket</span>
                    </a>
                    {user && (
                        <button className="w-full text-lg text-white font-bold py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
                            <PenSquare className="w-6 h-6" />
                            <span>Crear publicación</span>
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SideNav;