import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Twitter, Send, Copy, Globe, Star, Share2, Flame, Search, Shield, Info } from 'lucide-react';
import { allCoins, Coin } from '../data';
import LiveChat from '../components/LiveChat';
import AuditButton from '../components/AuditButton';
import FearGreedMeter from '../components/FearGreedMeter';
import CommunityVote from '../components/CommunityVote';
import TransactionList from '../components/TransactionList';
import TopHoldersModal from '../components/TopHoldersModal';
import AuditModal from '../components/AuditModal';
import SecurityWarningModal from '../components/SecurityWarningModal';

// ** AQUÍ ESTÁ EL CÓDIGO DEL GRÁFICO **
declare const TradingView: any;

const DiscordIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4464.8257-.6675 1.2844a18.2363 18.2363 0 00-5.4854 0c-.2211-.4587-.4565-.9091-.6675-1.2844a.0741.0741 0 00-.0785-.0371 19.7913 19.7913 0 00-4.8851 1.5152.069.069 0 00-.0321.0233c-3.3658 5.022-4.0428 9.4474-3.6045 13.6394a.0741.0741 0 00.0434.0741c1.4595.4587 2.9429.7182 4.4087.7733a.0741.0741 0 00.0785-.0524c.5428-1.584 1.5794-3.1206 3.018-4.4754a.0741.0741 0 01.104-.0147c.1158.0741.2315.163.3473.2519a12.2411 12.2411 0 00-3.447 2.023.0741.0741 0 00-.0147.0934c.4217.6373.8867 1.2222 1.3732 1.7712a.0741.0741 0 00.0832.0147c3.9383-1.7997 7.4529-5.4589 8.2814-9.7711a.0741.0741 0 00-.0321-.0832c-.0147-.0147-.0294-.0147-.0441-.0294zm-8.2201 9.2533a3.3523 3.3523 0 01-3.3472-3.3472 3.3523 3.3523 0 013.3472-3.3472 3.3523 3.3523 0 013.3472 3.3472 3.3523 3.3523 0 01-3.3472 3.3472zm4.735-3.3472a3.3523 3.3523 0 01-3.3472 3.3472 3.3523 3.3523 0 01-3.3472-3.3472 3.3523 3.3523 0 013.3472-3.3472 3.3523 3.3523 0 013.3472 3.3472z"/>
    </svg>
);


const CoinDetailPage = () => {
    const [coin, setCoin] = useState<Coin | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChartFullscreen, setIsChartFullscreen] = useState(false);
    const [userVote, setUserVote] = useState<'bullish' | 'bearish' | null>(null);
    const [isHoldersModalOpen, setIsHoldersModalOpen] = useState(false);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
        setIsAuthenticated(!!localStorage.getItem('token'));
        
        const path = window.location.hash.substring(1);
        const parts = path.split('/');
        const coinId = parts[1] === 'coin' && parts[2] ? parts[2] : null;

        if (coinId) {
            const foundCoin = allCoins.find(c => c.id === coinId);
            setCoin(foundCoin || null);
        }
        setLoading(false);
    }, []);

    const handleVote = (vote: 'bullish' | 'bearish') => {
        if (!isAuthenticated) return;
        setUserVote(userVote === vote ? null : vote);
    };

    const SocialButton = ({ hasLink, children, title }: { hasLink: boolean, children: React.ReactNode, title: string }) => {
        return (
            <button
                title={title}
                onClick={() => hasLink && setIsSecurityModalOpen(true)}
                className={`p-1.5 rounded-full hover:bg-gray-700/50 transition-colors ${!hasLink ? 'opacity-30 pointer-events-none' : ''}`}
            >
                {children}
            </button>
        );
    };

    // ** NUEVO useEffect para el gráfico **
    useEffect(() => {
        if (coin) {
            const widget = new TradingView.widget({
                container_id: "tv_chart_container",
                datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed.tradingview.com"),
                library_path: "https://charting-library.tradingview-widget.com/charting_library/",
                locale: "es",
                symbol: coin.symbol,
                interval: "D",
                toolbar_bg: "#161B22",
                overrides: {
                    "paneProperties.background": "#161B22",
                    "paneProperties.backgroundType": "solid"
                }
            });
        }
    }, [coin]);


    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!coin) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-white mb-4">Coin Not Found</h1>
                <p className="text-gray-400">The memecoin you're looking for doesn't exist.</p>
                <a href="#/" className="mt-6 inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Return to Dashboard
                </a>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            
            {!isChartFullscreen && (
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl px-4 py-2 mb-8 flex items-center justify-between">
                        {/* Grupo Izquierdo (Identidad y Acciones Rápidas) */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                                {coin.emoji}
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-white leading-tight">{coin.name}</h1>
                                <p className="text-sm text-gray-400 leading-tight">{coin.symbol} / SOL</p>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                                 <button
                                     onClick={() => setIsFavorite(!isFavorite)}
                                     className="p-1.5 rounded-full hover:bg-gray-700/50"
                                     title="Add to Favorites"
                                 >
                                     <Star className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                 </button>
                                 <button className="p-1.5 rounded-full hover:bg-gray-700/50" title="Share">
                                     <Share2 size={16} />
                                 </button>
                                 <button 
                                     onClick={() => setIsSecurityModalOpen(true)}
                                     className="p-1.5 rounded-full hover:bg-gray-700/50"
                                     title="Copy Contract Address"
                                 >
                                     <Copy size={16} />
                                 </button>
                            </div>
                        </div>

                        {/* Grupo Central (Información Clave y Enlaces) */}
                        <div className="hidden md:flex items-center space-x-2">
                            <div className="bg-yellow-500/20 text-yellow-400 rounded-full px-2 py-1 text-xs font-bold flex items-center">
                                <Flame size={12} className="mr-1" /> Hot14
                            </div>
                            <div className="flex items-center text-gray-300">
                                <SocialButton hasLink={!!coin.socials?.website} title="Website">
                                    <Globe size={16} />
                                </SocialButton>
                                <SocialButton hasLink={!!coin.socials?.twitter} title="Twitter">
                                    <Twitter size={16} />
                                </SocialButton>
                                <SocialButton hasLink={!!coin.socials?.telegram} title="Telegram">
                                    <Send size={16} />
                                </SocialButton>
                                <SocialButton hasLink={!!coin.socials?.discord} title="Discord">
                                    <DiscordIcon />
                                </SocialButton>
                            </div>
                            <button className="p-1.5 rounded-full hover:bg-gray-700/50 text-gray-300" title="Find">
                                <Search size={16} />
                            </button>
                            <button
                                onClick={() => setIsAuditModalOpen(true)}
                                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center space-x-1"
                            >
                                <Shield size={14} />
                                <span>Auditoría</span>
                            </button>
                        </div>

                        {/* Grupo Derecho (Precio y Opciones) */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <div className="flex items-center justify-end space-x-1">
                                    <h2 className="text-xl font-bold text-white">${coin.price.toFixed(6)}</h2>
                                    <Info size={14} className="text-gray-500" />
                                </div>
                                <p className="text-sm text-gray-400">{(coin.price / 50).toFixed(6)} SOL</p>
                            </div>
                            <div className={`text-center px-2 py-1 rounded-md ${coin.change24h > 0 ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
                                <p className={`font-bold ${coin.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>{coin.change24h.toFixed(2)}%</p>
                                <p className="text-xs text-gray-500">24h</p>
                            </div>
                        </div>
                    </div>
            )}


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className={isChartFullscreen ? 'fixed inset-0 z-50 bg-[#0D1117] p-4 flex flex-col' : 'lg:col-span-2 space-y-6'}>
                    {!isChartFullscreen && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <DataBox title="Market Cap" value={coin.marketCap} color="text-cyan-400" />
                                <DataBox title="Volume 24h" value={coin.volume24h} color="text-green-400" />
                                <DataBox title="Liquidity" value={coin.liquidity} color="text-yellow-400" />
                                <DataBox title="Volatility" value={`${coin.volatility}%`} color="text-pink-400" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DataBox title="Total Supply" value={coin.totalSupply} color="text-purple-400" />
                                <DataBox title="Circulating Supply" value={coin.circulatingSupply} color="text-orange-400" />
                            </div>
                        </>
                    )}
                    <div id="tv_chart_container"></div>
                    {!isChartFullscreen && <TransactionList coinSymbol={coin.symbol} />}
                </div>

                {/* Right Column */}
                {!isChartFullscreen && (
                    <div className="lg:col-span-1 space-y-6">
                        <LiveChat coinId={coin.id} coinName={coin.name} isAuthenticated={isAuthenticated} />
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-cyan-400 mb-4 text-center">Fear & Greed Index</h3>
                            <FearGreedMeter value={coin.fearGreedIndex || 65} />
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
                            <CommunityVote bullishVotes={coin.bullishVotes || 1247} bearishVotes={coin.bearishVotes || 456} userVote={userVote} onVote={handleVote} isAuthenticated={isAuthenticated} />
                        </div>
                    </div>
                )}
            </div>
            <TopHoldersModal isOpen={isHoldersModalOpen} onClose={() => setIsHoldersModalOpen(false)} topHolders={coin.topHolders || []} />
            <AuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
            <SecurityWarningModal isOpen={isSecurityModalOpen} onClose={() => setIsSecurityModalOpen(false)} />
        </div>
    );
};

interface DataBoxProps {
    title: string;
    value: string;
    color: string;
}

function DataBox({ title, value, color }: DataBoxProps) {
    return (
        <div className="bg-gray-800 border border-gray-700/30 rounded-lg p-6 hover:border-cyan-400/30 transition-all duration-300 text-center">
            <div className="text-sm text-gray-400 mb-1">{title}</div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
        </div>
    );
}

export default CoinDetailPage;