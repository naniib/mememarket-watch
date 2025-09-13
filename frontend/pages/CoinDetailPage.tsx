
import React, { useState, useEffect, useMemo } from 'react';
import { Star, Share2, Copy, Globe, Send, Search, ChevronsLeft, ChevronsRight, Users, ExternalLink, Trophy, Package, Zap, PieChart, ArrowRightLeft, Box, Coins, Percent, Clock, DollarSign, Droplets, RefreshCw, BarChart, TrendingUp, TrendingDown } from 'lucide-react';
import { allCoins, Coin } from '../data';
import TradingViewChart from '../tradingview/TradingViewChart';
import LiveChat from '../components/LiveChat';
import FearGreedMeter from '../components/FearGreedMeter';
import CommunityVote from '../components/CommunityVote';
import TransactionList from '../components/TransactionList';
import TopHoldersModal from '../components/TopHoldersModal';
import AuditModal from '../components/AuditModal';
import SecurityWarningModal from '../components/SecurityWarningModal';
import StatsModal from '../components/StatsModal'; 

// --- Local Components & Helpers ---

const XIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const TelegramIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.1l15.97-6.16c.73-.28 1.4.24 1.15.99L18.23 18.5c-.27.8-.82 1-1.5.61l-4.1-3.25-1.87 1.8c-.24.24-.45.46-.8.46z" /></svg>;

const InfoIcon = ({ info }: { info: string }) => (
    <span className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 text-xs font-bold text-gray-800 bg-gray-400 rounded-full cursor-help" title={info}>
        i
    </span>
);

const formatValue = (value?: string | number) => {
    if (value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') {
        if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
        return value.toLocaleString();
    }
    return value;
};


export interface StatCardProps { 
    title: string;
    value?: string | number;
    children?: React.ReactNode;
    onClick?: () => void;
    info?: string;
    highlightColor?: 'cyan' | 'amber';
    statusTag?: {
        text: string;
        color: 'green' | 'red';
    };
    icon: React.ElementType;
}

// Exportamos StatCard también
export const StatCard = ({ title, value, children, onClick, info, highlightColor, statusTag, icon: Icon }: StatCardProps) => {
    const topBorderColors: Record<string, string> = {
        cyan: 'bg-cyan-400',
        amber: 'bg-amber-400',
        default: 'bg-gray-700'
    };

    const baseClasses = `bg-[#1c2128] rounded-xl flex flex-col justify-between transition-all duration-300 h-full text-left shadow-lg overflow-hidden relative`;
    
    let variantClasses = `border border-transparent ${onClick ? 'cursor-pointer hover:border-cyan-400/50 hover:bg-[#222831]' : ''}`;

    if (highlightColor) {
        const colorStyles = {
            cyan: `border-cyan-400/60 shadow-cyan-500/10 cursor-pointer hover:bg-cyan-900/20 hover:shadow-cyan-500/20`,
            amber: `border-amber-400/60 shadow-amber-500/10 cursor-pointer hover:bg-amber-900/20 hover:shadow-amber-500/20`
        };
        variantClasses = colorStyles[highlightColor];
    }

    const cardClasses = `${baseClasses} ${variantClasses}`;
    
    const content = (
        <>
            <div className={`absolute top-0 left-0 h-1 w-full ${topBorderColors[highlightColor || 'default']}`}></div>
            <div className="p-4">
                <div className="flex items-center text-sm text-gray-400 truncate mb-2">
                    {Icon && <Icon className="w-4 h-4 mr-2 flex-shrink-0" />}
                    <span className="truncate font-semibold">{title}</span>
                    {statusTag && (
                        <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                            statusTag.color === 'green'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                        }`}>
                            {statusTag.text}
                        </span>
                    )}
                    {info && <InfoIcon info={info} />}
                </div>
                {value !== undefined && value !== null && <div className="text-3xl font-bold text-white mt-1 leading-tight truncate font-mono">{formatValue(value)}</div>}
                {children && <div className="mt-2 text-lg">{children}</div>}
            </div>
        </>
    );

    const commonProps = {
        className: cardClasses,
        ...(onClick && { onClick }),
    };

    return React.createElement(onClick ? 'button' : 'div', commonProps, content);
};


const CoinDetailPage = () => {
    const [coin, setCoin] = useState<Coin | null>(null);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [isSentimentVisible, setIsSentimentVisible] = useState(true);
    const [isTopHoldersModalOpen, setTopHoldersModalOpen] = useState(false);
    const [isAuditModalOpen, setAuditModalOpen] = useState(false);
    const [isSecurityWarningOpen, setSecurityWarningOpen] = useState(false);
    const [userVote, setUserVote] = useState<'bullish' | 'bearish' | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false); 

    useEffect(() => {
        const handleHashChange = () => {
            const path = window.location.hash.substring(1);
            const parts = path.split('/');
            const coinId = parts[2];
            const foundCoin = allCoins.find(c => c.id === coinId);
            setCoin(foundCoin || null);
        };

        handleHashChange(); 
        window.addEventListener('hashchange', handleHashChange);

        setIsAuthenticated(!!localStorage.getItem('token'));

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Cargar el estado desde localStorage cuando cambia la moneda
    useEffect(() => {
        if (coin?.id) {
            // Cargar estado de chat
            const savedChatState = localStorage.getItem(`isChatVisible_${coin.id}`);
            setIsChatVisible(savedChatState !== null ? JSON.parse(savedChatState) : true);

            // Cargar estado de sentimiento
            const savedSentimentState = localStorage.getItem(`isSentimentVisible_${coin.id}`);
            setIsSentimentVisible(savedSentimentState !== null ? JSON.parse(savedSentimentState) : true);
        }
    }, [coin?.id]);

    // Guardar el estado del chat en localStorage para la moneda específica
    useEffect(() => {
        if (coin?.id) {
            localStorage.setItem(`isChatVisible_${coin.id}`, JSON.stringify(isChatVisible));
        }
    }, [isChatVisible, coin?.id]);

    // Guardar el estado de sentimiento en localStorage para la moneda específica
    useEffect(() => {
        if (coin?.id) {
            localStorage.setItem(`isSentimentVisible_${coin.id}`, JSON.stringify(isSentimentVisible));
        }
    }, [isSentimentVisible, coin?.id]);

    const handleVote = (vote: 'bullish' | 'bearish') => {
        if (!isAuthenticated) return;
        setUserVote(prev => (prev === vote ? null : vote));
    };

    const allStats = useMemo((): StatCardProps[] => {
        if (!coin) return [];
    
        const change24h = coin.change24h ?? 0;
        let multiplierTitle: string;
        let statusTag: StatCardProps['statusTag'];
        let perfIcon: React.ElementType;
    
        if (change24h > 1) {
            multiplierTitle = 'Upside (ATH)';
            statusTag = { text: 'Pumping', color: 'green' };
            perfIcon = TrendingUp;
        } else if (change24h < -1) {
            multiplierTitle = 'Downside (ATH)';
            statusTag = { text: 'Dumping', color: 'red' };
            perfIcon = TrendingDown;
        } else {
            multiplierTitle = 'Performance (ATH)';
            statusTag = { text: 'Stable', color: 'green' }; // Or another color
            perfIcon = TrendingUp;
        }
    
        return [
            { title: "Top 10 Holders", children: <div className="flex items-center space-x-2 text-cyan-400 font-bold"><Trophy size={20} className="text-yellow-400" /><span>Ver Lista</span></div>, onClick: () => setTopHoldersModalOpen(true), highlightColor: 'cyan', icon: Trophy },
            { title: "Market Cap", value: `$${coin.marketCap}`, icon: DollarSign },
            { title: "Liquidez", value: `$${coin.liquidity}`, icon: Droplets },
            { title: "Holders", value: coin.holders, icon: Users },
            { title: multiplierTitle, value: "x125 🔥", highlightColor: 'amber', statusTag, icon: perfIcon },
            { title: "Circ. Supply", value: coin.circulatingSupply, icon: RefreshCw },
            { title: "Total Mktcap", value: `$${coin.totalMarketCap}`, icon: Globe },
            { title: "Volumen en 24h", value: `$${coin.volume24h}`, icon: BarChart },
            { title: "Total Supply", value: coin.totalSupply, icon: Package },
            { title: "Volatilidad (24h)", value: `${(coin.volatility * 100).toFixed(2)}%`, icon: Zap },
            { title: "% Circ. Supply", value: `${coin.circSupplyPercentage}%`, icon: PieChart },
            { title: "Total TXs", value: coin.totalTx, icon: ArrowRightLeft },
            { title: "SOL en Pool", value: `${coin.pooledSol.toFixed(2)} SOL`, icon: Box },
            { title: "Memecoin en Pool", value: coin.pooledMemecoin, icon: Coins },
            { title: "% Memecoin en Pool", value: `${coin.pooledMemecoinPercentage}%`, icon: Percent },
            { title: "Pool Creado", value: coin.poolCreated, icon: Clock },
        ];
    }, [coin]);

    const basicStats = useMemo(() => allStats.slice(0, 8), [allStats]);
    const advancedStats = useMemo(() => allStats.slice(8), [allStats]); 

    const gridStyle = useMemo(() => {
        const isAnySidebarVisible = isChatVisible || isSentimentVisible;
        
        let areas;
        if (isChatVisible && isSentimentVisible) {
            areas = `"chart chat" "trades sentiment"`;
        } else if (isChatVisible && !isSentimentVisible) {
            areas = `"chart chat" "trades trades"`;
        } else if (!isChatVisible && isSentimentVisible) {
            areas = `"chart chart" "trades sentiment"`;
        } else { // both hidden
            areas = `"chart chart" "trades trades"`;
        }

        return {
            display: 'grid',
            gridTemplateColumns: isAnySidebarVisible ? '1fr 400px' : '1fr 0px',
            gridTemplateRows: 'auto minmax(0, 1fr)',
            gridTemplateAreas: areas,
            gap: isAnySidebarVisible ? '1rem' : '0',
        };
    }, [isChatVisible, isSentimentVisible]);


    if (!coin) {
        return <div className="text-center p-10 text-gray-400">Loading coin data or coin not found...</div>;
    }

    const priceChangeColor = (coin.change24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400';

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            <TopHoldersModal isOpen={isTopHoldersModalOpen} onClose={() => setTopHoldersModalOpen(false)} topHolders={coin.topHolders || []} />
            <AuditModal isOpen={isAuditModalOpen} onClose={() => setAuditModalOpen(false)} />
            <SecurityWarningModal isOpen={isSecurityWarningOpen} onClose={() => setSecurityWarningOpen(false)} />
            <StatsModal isOpen={isStatsModalOpen} onClose={() => setIsStatsModalOpen(false)} advancedStats={advancedStats} />

            {/* Header */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-3xl flex-shrink-0">{coin.emoji}</div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-white">{coin.name}</h1>
                            <button className="text-gray-400 hover:text-yellow-400" title="Add to Watchlist"><Star size={18} /></button>
                            <button className="text-gray-400 hover:text-cyan-400" title="Share"><Share2 size={18} /></button>
                        </div>
                        <p className="text-sm text-gray-500">@{coin.symbol.toLowerCase()}/sol</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3 flex-wrap">
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs font-bold px-2 py-1 rounded-md">NEW</span>
                    <div className="flex items-center space-x-3 text-gray-500">
                        <button onClick={() => setSecurityWarningOpen(true)} className="hover:text-white" title="Twitter"><XIcon /></button>
                        <button onClick={() => setSecurityWarningOpen(true)} className="hover:text-white" title="Telegram"><TelegramIcon /></button>
                        <button onClick={() => setSecurityWarningOpen(true)} className="hover:text-white" title="Explorer"><Search size={20} /></button>
                        <button onClick={() => setSecurityWarningOpen(true)} className="hover:text-white" title="Website"><Globe size={20} /></button>
                    </div>
                    <button onClick={() => setAuditModalOpen(true)} className="bg-green-600/80 hover:bg-green-600 text-white font-bold py-1.5 px-4 rounded-lg text-sm">Auditoría</button>
                </div>

                <div className="text-right flex-shrink-0 pl-4">
                    <p className="text-3xl font-bold text-white">${(coin.price ?? 0).toFixed(6)}</p>
                    <div className="flex items-center justify-end space-x-2">
                        <p className={`text-md font-semibold ${priceChangeColor}`}>{(coin.change24h ?? 0).toFixed(2)}%</p>
                        <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-0.5 rounded-md">24h</span>
                    </div>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {basicStats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>
                
                <div className="border-t border-[#30363D] mt-4 pt-3 text-center">
                    <button onClick={() => setIsStatsModalOpen(true)} className="text-cyan-400 font-semibold text-sm hover:text-cyan-300">
                        Más Información 👇
                    </button>
                </div>
            </div>
            
            <main style={gridStyle as React.CSSProperties} className="transition-all duration-300">
                <div style={{ gridArea: 'chart' }} className="relative min-h-[450px]">
                    <TradingViewChart />
                    <button
                        onClick={() => setIsChatVisible(!isChatVisible)}
                        className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 p-2 bg-[#161B22] border border-[#30363D] rounded-full text-gray-400 hover:bg-cyan-500/20 hover:text-white"
                        aria-label={isChatVisible ? "Ocultar chat" : "Mostrar chat"}
                    >
                        {isChatVisible ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
                    </button>
                </div>
                
                <div style={{ gridArea: 'chat' }} className={`flex flex-col min-h-0 transition-all duration-300 ${!isChatVisible ? 'hidden' : ''}`}>
                    <LiveChat coinId={coin.id} coinName={coin.name} isAuthenticated={isAuthenticated} />
                </div>
                
                <div style={{ gridArea: 'trades' }} className="relative min-h-[500px]">
                    <TransactionList coinSymbol={coin.symbol} />
                    <button
                        onClick={() => setIsSentimentVisible(!isSentimentVisible)}
                        className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 p-2 bg-[#161B22] border border-[#30363D] rounded-full text-gray-400 hover:bg-cyan-500/20 hover:text-white"
                        aria-label={isSentimentVisible ? "Ocultar widgets" : "Mostrar widgets"}
                    >
                        {isSentimentVisible ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
                    </button>
                </div>

                <div style={{ gridArea: 'sentiment' }} className={`space-y-4 min-h-0 transition-all duration-300 ${!isSentimentVisible ? 'hidden' : ''}`}>
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                        <h3 className="text-lg font-bold text-cyan-400 mb-2 text-center">Fear & Greed Index</h3>
                        <FearGreedMeter value={coin.fearGreedIndex || 0} size={180} />
                    </div>
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                        <CommunityVote
                            bullishVotes={coin.bullishVotes || 0}
                            bearishVotes={coin.bearishVotes || 0} 
                            userVote={userVote}
                            onVote={handleVote}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CoinDetailPage;