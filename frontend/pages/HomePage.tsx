import React, { useState, useEffect } from 'react';
import { allCoins, type Coin } from '../data';
import CoinCard from '../components/CoinCard';
import PumpUrShitNowModal from '../components/PumpUrShitNowModal';

// --- Local Components for HomePage ---

// SearchBar Component (as defined in the new Dashboard structure)
const SearchBar = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => (
    <div className="relative w-full max-w-md">
        <input
            type="text"
            placeholder="Buscar por símbolo, nombre o dirección de contrato"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#161B22] border border-[#30363D] rounded-lg pl-5 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
        />
    </div>
);

// PumpButton Component (as defined in the new Dashboard structure)
const PumpButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-500/50"
    >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
        <span className="relative z-10">PumpUr$hitNow</span>
    </button>
);

// MemeCoinLists Component: Displays the default three-column view.
interface MemeCoinListsProps {
    onCoinSelect: (coin: Coin) => void;
    isAuthenticated: boolean;
}

const MemeCoinLists = ({ onCoinSelect, isAuthenticated }: MemeCoinListsProps) => {
    const hotCoins = allCoins.filter(coin => coin.category === 'hot');
    const warmCoins = allCoins.filter(coin => coin.category === 'warm');
    const coldCoins = allCoins.filter(coin => coin.category === 'cold');

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* MEMEHOT */}
                <div className="flex flex-col lg:flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-red-400/50 animate-pulse">🔥</div>
                            <div className="text-2xl font-bold text-red-400 font-mono tracking-wider">MEMEHOT</div>
                            <div className="flex-1 h-px bg-gradient-to-r from-red-400/50 to-transparent"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900/80 backdrop-blur-sm border-2 border-red-400/30 rounded-2xl p-6 space-y-4 shadow-xl">
                        {hotCoins.map((coin, index) => (
                            <CoinCard key={coin.id} coin={coin} rank={index + 1} category="hot" onClick={() => onCoinSelect(coin)} isAuthenticated={isAuthenticated} />
                        ))}
                    </div>
                </div>
                {/* MEMEWARM */}
                <div className="flex flex-col lg:flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-yellow-400/50 animate-pulse">🥵</div>
                            <div className="text-2xl font-bold text-yellow-400 font-mono tracking-wider">MEMEWARM</div>
                            <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl p-6 space-y-4 shadow-xl">
                        {warmCoins.map((coin, index) => (
                            <CoinCard key={coin.id} coin={coin} rank={index + 1} category="warm" onClick={() => onCoinSelect(coin)} isAuthenticated={isAuthenticated} />
                        ))}
                    </div>
                </div>
                {/* MEMECOLD */}
                <div className="flex flex-col lg:flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-blue-400/50 animate-pulse">❄️</div>
                            <div className="text-2xl font-bold text-blue-400 font-mono tracking-wider">MEMECOLD</div>
                            <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-900/80 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl p-6 space-y-4 shadow-xl">
                        {coldCoins.map((coin, index) => (
                            <CoinCard key={coin.id} coin={coin} rank={index + 1} category="cold" onClick={() => onCoinSelect(coin)} isAuthenticated={isAuthenticated} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


// SearchResults Component: Displays a single list of search results.
const SearchResults = ({ results, onCoinSelect, isAuthenticated, searchQuery }: { results: Coin[], onCoinSelect: (coin: Coin) => void, isAuthenticated: boolean, searchQuery: string }) => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Resultados de la Búsqueda</h2>
        {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((coin, index) => (
                    <CoinCard 
                        key={coin.id} 
                        coin={coin} 
                        rank={index + 1} 
                        category={coin.category} 
                        onClick={() => onCoinSelect(coin)} 
                        isAuthenticated={isAuthenticated} 
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-10 bg-[#161B22] border border-[#30363D] rounded-lg">
                <p className="text-gray-400">No se encontraron resultados para "{searchQuery}".</p>
            </div>
        )}
    </div>
);


// --- Main HomePage Component ---
const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isPumpModalOpen, setIsPumpModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);

    const handleCoinSelect = (coin: Coin) => {
        window.location.hash = `#/coin/${coin.id}`;
    };

    const isSearching = searchQuery.trim() !== '';

    const searchResults = isSearching
        ? allCoins.filter(coin =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    return (
        <div className="container mx-auto px-6 py-8 relative">
            {isPumpModalOpen && <PumpUrShitNowModal onClose={() => setIsPumpModalOpen(false)} />}
            
            <div className="flex justify-end mb-8">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Banners and Pump Button are always visible */}
            <div className="mb-6">
                <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/20 via-cyan-400/30 to-cyan-500/20 border-2 border-cyan-400/50 rounded-2xl p-4 h-20 shadow-xl shadow-cyan-400/20">
                    <div className="flex items-center h-full">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-cyan-400/50 animate-pulse flex-shrink-0 mr-4">🚀</div>
                        <div className="flex-1 overflow-hidden">
                            <div className="whitespace-nowrap text-cyan-400 font-mono text-lg font-bold animate-marquee flex">
                                {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mr-4">SPONSORED:</span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-cyan-400/50 text-sm">🚀</span><span>MOONDOG - Next 1000x Potential!</span></span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-cyan-400/50 text-sm">⚡</span><span>LIGHTNINGCAT - Lightning Fast Gains!</span></span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-cyan-400/50 text-sm">🔥</span><span>FIREWOLF - Burning Through Resistance!</span></span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-cyan-400/50 text-sm">💎</span><span>DIAMONDHANDS - Hold Forever Protocol!</span></span>
                                </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-8">
                <PumpButton onClick={() => setIsPumpModalOpen(true)} />
            </div>

            <div className="mb-8">
                <div className="relative overflow-hidden bg-gradient-to-r from-red-500/20 via-red-400/30 to-red-500/20 border-2 border-red-400/50 rounded-2xl p-4 h-20 shadow-xl shadow-red-400/20">
                    <div className="flex items-center h-full">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-red-400/50 animate-pulse flex-shrink-0 mr-4">⚠️</div>
                        <div className="flex-1 overflow-hidden">
                            <div className="whitespace-nowrap text-red-400 font-mono text-lg font-bold animate-marquee flex">
                                {[...Array(2)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-red-400/50 text-sm">⚠️</span><span>RUGPULL DETECTED: SCAMCOIN ($SCAM) - 95% liquidity removed!</span></span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-red-400/50 text-sm">🚨</span><span>HIGH RISK: HONEYPOT ($HONEY) - Unable to sell detected!</span></span>
                                    <span className="inline-flex items-center space-x-2 mr-8"><span className="w-8 h-8 bg-black rounded-full flex items-center justify-center border border-red-400/50 text-sm">📉</span><span>FLASH CRASH: DUMPCOIN ($DUMP) - 80% price drop in 5 minutes!</span></span>
                                </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Conditional Rendering for Search Results vs Default View */}
            {isSearching ? (
                <SearchResults
                    results={searchResults}
                    onCoinSelect={handleCoinSelect}
                    isAuthenticated={isAuthenticated}
                    searchQuery={searchQuery}
                />
            ) : (
                <MemeCoinLists
                    onCoinSelect={handleCoinSelect}
                    isAuthenticated={isAuthenticated}
                />
            )}
        </div>
    );
};

export default HomePage;
