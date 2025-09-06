import React, { useState, useRef, useEffect } from 'react';

const LightningIcon = () => (
    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
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
const EthereumIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#627EEA" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L3 12l9 12 9-12L12 0zm0 21.6l-7.2-9.6 7.2-3.6 7.2 3.6L12 21.6zm0-10.8L4.8 12 12 8.4l7.2 3.6L12 10.8z"/></svg>;
const ArbitrumIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#28A0F0" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM9,6.11l7.3,3.37L9,12.85Zm0,7.66,7.3,3.37L9,20.5Z"/></svg>;
const BaseIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#0052FF" xmlns="http://www.w3.org/2000/svg"><path d="M12,24A12,12,0,1,1,24,12,12,12,0,0,1,12,24ZM8,9.45v5.1H16V9.45Z"/></svg>;
const AvalancheIcon = () => <svg role="img" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#E84142" xmlns="http://www.w3.org/2000/svg"><path d="M2.54 19.64h6.58l3.15-5.32L9.42 8.8h5.16L21.46 19.64h-5.46l-1.39-2.3H9.37l-1.4 2.3zM12 2.36L.3 21.64h23.4L12 2.36z"/></svg>;


const networks = [
    { name: 'Solana', logo: <SolanaIcon /> },
    { name: 'BNB Chain', logo: <BnbChainIcon /> },
    { name: 'Polygon', logo: <PolygonIcon /> },
    { name: 'Ethereum', logo: <EthereumIcon /> },
    { name: 'Arbitrum', logo: <ArbitrumIcon /> },
    { name: 'Base', logo: <BaseIcon /> },
    { name: 'Avalanche', logo: <AvalancheIcon /> },
];

const Header = () => {
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
    const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);

    const networkDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
                setIsNetworkDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };


    return (
        <header className="bg-[#161B22]/80 backdrop-blur-md border-b border-[#30363D] sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <a href="#/" className="flex items-center space-x-2">
                        <LightningIcon />
                        <span className="text-xl font-bold text-white">MemeMarket</span>
                        <span className="text-xs font-mono bg-gray-700 text-cyan-400 px-2 py-0.5 rounded">WATCH</span>
                    </a>
                    <div className="flex items-center space-x-6">
                        <a href="#/home" className="text-sm font-medium text-gray-300 hover:text-white">MemeWatch Social</a>
                        <div className="relative" ref={networkDropdownRef}>
                            <button onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)} className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                                NETWORKS <ChevronDownIcon />
                            </button>
                            {isNetworkDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#161B22] border border-[#30363D] rounded-lg shadow-lg">
                                    <ul className="py-2">
                                        {networks.map(network => (
                                            <li key={network.name}>
                                                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#30363D]">
                                                    {network.logo}
                                                    {network.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        
                        {user ? (
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                                <LogoutIcon />
                                Logout
                            </button>
                        ) : (
                            <a href="#/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" /></svg>
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;