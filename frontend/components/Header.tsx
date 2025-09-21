
import React, { useState, useRef, useEffect } from 'react';

const Logo = () => (
    <img src="https://i.imgur.com/2jgOCyH.png" alt="MemeMarket Logo featuring Nelson the cat" className="w-12 h-12 rounded-full object-cover" />
);

const LogoutIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);

const ChevronDownIcon = () => (
    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

// --- Network SVG Icons ---
const SolanaIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="url(#sol_grad)" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sol_grad" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#00FFA3" /><stop offset="100%" stopColor="#DC1FFF" /></linearGradient></defs><path d="M4.262 18.883l3.336-1.933a.4.4 0 00.2-.347V7.393a.4.4 0 00-.2-.347L4.262 5.113a.4.4 0 00-.6.347v13.076a.4.4 0 00.6.347zM9.138 21.013l3.336-1.933a.4.4 0 00.2-.347V9.573a.4.4 0 00-.2-.347L9.138 7.293a.4.4 0 00-.6.347v13.026a.4.4 0 00.6.347zM14.013 16.743l3.336-1.933a.4.4 0 00.2-.347V4.303a.4.4 0 00-.2-.347l-3.336-1.93a.4.4 0 00-.6.346v13.98a.4.4 0 00.6.347zM18.888 18.883l-3.336-1.933a.4.4 0 01-.2-.347V7.393a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.076a.4.4 0 01-.6.347zM13.988 21.013l-3.336-1.933a.4.4 0 01-.2-.347V9.573a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.026a.4.4 0 01-.6.347zM9.113 16.743l-3.336-1.933a.4.4 0 01-.2-.347V4.303a.4.4 0 01.2-.347l3.336-1.93a.4.4 0 01.6.346v13.98a.4.4 0 01-.6.347z"/></svg>;
const BnbChainIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#F0B90B" xmlns="http://www.w3.org/2000/svg"><path d="M12 24l4.8-4.8L12 14.4 7.2 19.2 12 24zm4.8-19.2L12 0l-4.8 4.8L12 9.6l4.8-4.8zM0 12l4.8-4.8L9.6 12 4.8 16.8 0 12zm19.2-4.8L14.4 12l4.8 4.8L24 12l-4.8-4.8zM12 13.2l-1.2-1.2-1.2 1.2 1.2 1.2 1.2-1.2z"/></svg>;
const PolygonIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#8247E5" xmlns="http://www.w3.org/2000/svg"><path d="M16.48.62L7.52.62C6.16.62 5.04 1.75 5.04 3.1l0 8.96c0 1.35 1.12 2.47 2.48 2.47l8.96 0c1.35 0 2.47-1.12 2.47-2.48l0-8.96C18.96 1.75 17.83.62 16.48.62zM16.48 23.38l-8.96 0c-1.35 0-2.47-1.12-2.47-2.48l0-8.96c0-1.35 1.12-2.47 2.48-2.47l8.96 0c1.35 0 2.47 1.12 2.47 2.48l0 8.96C18.96 22.25 17.83 23.38 16.48 23.38z"/></svg>;
const EthereumIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#627EEA" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L3 12l9 12 9-12L12 0zM12 3.6l6.3 8.4-6.3 4.2-6.3-4.2L12 3.6z"/></svg>;

interface User {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string;
}

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onLoginClick: () => void;
}

const Header = ({ user, onLogout, onLoginClick }: HeaderProps) => {
    const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const networkMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (networkMenuRef.current && !networkMenuRef.current.contains(event.target as Node)) {
                setIsNetworkMenuOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const networks = [
        { name: 'Solana', icon: SolanaIcon },
        { name: 'BNB Chain', icon: BnbChainIcon },
        { name: 'Polygon', icon: PolygonIcon },
        { name: 'Ethereum', icon: EthereumIcon },
    ];
    
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

    return (
        <header className="bg-black border-b border-gray-900 sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <a href="#/" className="flex items-center space-x-2">
                            <Logo />
                            <span className="text-2xl font-display text-white tracking-wide">MemeMarket</span>
                            <span className="text-xs font-display bg-gray-800 text-[#00f5b3] px-2 py-0.5 rounded-md tracking-widest">WATCH</span>
                        </a>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a 
                            href="#/home" 
                            className="hidden md:block bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg text-sm border border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/40 transition-all duration-300"
                        >
                            Meme Social
                        </a>
                        
                        <div className="relative" ref={networkMenuRef}>
                            <button 
                                onClick={() => setIsNetworkMenuOpen(!isNetworkMenuOpen)} 
                                className="flex items-center space-x-2 bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg text-sm border border-purple-500/50 hover:border-purple-400 hover:bg-purple-900/40 transition-all duration-300"
                            >
                                <selectedNetwork.icon />
                                <span>{selectedNetwork.name}</span>
                                <ChevronDownIcon />
                            </button>
                            {isNetworkMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-1">
                                    {networks.map(network => (
                                        <a href="#" key={network.name} onClick={(e) => { e.preventDefault(); setSelectedNetwork(network); setIsNetworkMenuOpen(false); }} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                                            <network.icon />
                                            {network.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 group">
                                    <img 
                                        src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`} 
                                        alt="avatar" 
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all duration-300" 
                                    />
                                    <ChevronDownIcon />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-1">
                                        <div className="px-4 py-2 border-b border-gray-800">
                                            <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-800">
                                            <LogoutIcon />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={onLoginClick} className="bg-[#00f5b3] text-black font-bold py-2 px-5 rounded-lg text-sm transition-transform hover:scale-105">
                                Connect
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;