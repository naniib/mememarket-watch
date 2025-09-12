import React, { useState, useEffect, useMemo } from 'react';
import { Star, Share2, Copy, Globe, Send, Search, ChevronsLeft, ChevronsRight, Users, ExternalLink, Trophy } from 'lucide-react';
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

const formatK = (num?: number) => {
    if (num === undefined || num === null) return 'N/A';
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
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
}

// Exportamos StatCard también
export const StatCard = ({ title, value, children, onClick, info, highlightColor, statusTag }: StatCardProps) => {
    const baseClasses = `bg-[#161B22] rounded-xl p-3 flex flex-col justify-between transition-all duration-200 h-full`;
    
    let variantClasses = `border border-[#30363D] ${onClick ? 'cursor-pointer hover:border-cyan-400/50 hover:bg-[#1D2127]' : ''}`;

    if (highlightColor) {
        const colorStyles = {
            cyan: `border-cyan-400 shadow-lg shadow-cyan-500/30 cursor-pointer hover:bg-cyan-900/40 hover:shadow-cyan-500/50 animate-pulse-border`,
            amber: `border-amber-400 shadow-lg shadow-amber-500/30 cursor-pointer hover:bg-amber-900/40 hover:shadow-amber-500/50 animate-pulse-border`
        };
        variantClasses = colorStyles[highlightColor];
    }

    const cardClasses = `${baseClasses} ${variantClasses}`;
    
    const content = (
        <>
            <div className="flex items-center text-sm text-gray-400 truncate">
                <span className="truncate">{title}</span>
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
            {value !== undefined && value !== null && <div className="text-2xl font-bold text-white mt-1 leading-tight truncate">{typeof value === 'number' ? formatK(value) : value}</div>}
            {children && <div className="mt-1">{children}</div>}
        </>
    );

    if (onClick) {
        return <button type="button" onClick={onClick} className={cardClasses + " w-full"}>{content}</button>;
    }
    
    return <div className={cardClasses}>{content}</div>;
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

    const handleVote = (vote: 'bullish' | 'bearish') => {
        if (!isAuthenticated) return;
        setUserVote(prev => (prev === vote ? null : vote));
    };

    const gridStyle = useMemo(() => {
        const hasRightColumn = isChatVisible || isSentimentVisible;
        // Si no hay columna derecha visible, el segundo track es 0 y el primero ocupa todo (1fr).
        // El gap se elimina en ese caso.
        const gridTemplateColumns = hasRightColumn ? '1fr 400px' : '1fr 0px';
        const gridTemplateRows = 'auto minmax(0, 1fr)'; 
        
        let gridTemplateAreas;
        if (isChatVisible && isSentimentVisible) {
            gridTemplateAreas = `"chart chat" "trades sentiment"`;
        } else if (isChatVisible && !isSentimentVisible) {
            // Si solo el chat está visible, el sentimiento se colapsa.
            gridTemplateAreas = `"chart chat" "trades trades"`; 
        } else if (!isChatVisible && isSentimentVisible) {
            // Si solo el sentimiento está visible, el chat se colapsa.
            gridTemplateAreas = `"chart chart" "trades sentiment"`; 
        } else { // Ambos ocultos (chat y sentimiento)
            gridTemplateAreas = `"chart chart" "trades trades"`; // Ambos ocupan todo el ancho
        }

        return {
            display: 'grid',
            gridTemplateColumns,
            gridTemplateRows,
            gridTemplateAreas,
            // CORRECCIÓN CLAVE: El gap debe ser 0 si la columna derecha está colapsada.
            gap: hasRightColumn ? '1rem' : '0', 
            transition: 'all 0.3s ease-in-out',
        };
    }, [isChatVisible, isSentimentVisible]);


    const allStats = useMemo(() => {
        if (!coin) return [];

        let multiplierTitle: string;
        if ((coin.change24h ?? 0) > 1) { 
            multiplierTitle = 'Upside (ATH)';
        } else if ((coin.change24h ?? 0) < -1) {
            multiplierTitle = 'Downside (ATH)';
        } else {
            multiplierTitle = 'Performance (ATH)';
        }

        return [
            // --- Stats Básicas (8) ---
            { 
                title: "Top 10 Holders", 
                children: (
                    <div className="flex items-center space-x-2 text-cyan-400 font-bold">
                        <Trophy size={20} className="text-yellow-400" />
                        <span>Ver Lista</span>
                    </div>
                ),
                onClick: () => setTopHoldersModalOpen(true),
                highlightColor: 'cyan' as 'cyan'
            },
            { title: "Market Cap", value: `$${formatK(coin.marketCap)}` },
            { title: "Liquidez", value: `$${formatK(coin.liquidity)}` },
            { title: "Holders", value: formatK(coin.holders) },
            { 
                title: multiplierTitle, 
                value: "x125 🔥", 
                highlightColor: 'amber' as 'amber',
                statusTag: (coin.change24h ?? 0) > 0 
                    ? { text: 'Pumping', color: 'green' as 'green' } 
                    : { text: 'Dumping', color: 'red' as 'red' }
            },
            { title: "Circ. Supply", value: formatK(coin.circulatingSupply) },
            { title: "Total Mktcap", value: `$${formatK(coin.totalMarketCap)}` },
            { title: "Volumen en 24h", value: `$${formatK(coin.volume24h)}` },
            // --- Stats Avanzadas (las 6 restantes) ---
            { title: "Total Supply", value: formatK(coin.totalSupply) },
            { title: "Volatilidad", value: `${(coin.volatility ?? 0).toFixed(4)}`, info: "Medida de la fluctuación del precio." },
            { title: "% Circ. Supply", value: `${(coin.circSupplyPercentage ?? 0).toFixed(2)}%` },
            { title: "Total TXs", value: formatK(coin.totalTx) },
            { title: "SOL en Pool", value: `${(coin.pooledSol ?? 0).toFixed(2)} SOL` },
            { title: "Memecoin en Pool", value: formatK(coin.pooledMemecoin) },
            { title: "% Memecoin en Pool", value: `${(coin.pooledMemecoinPercentage ?? 0).toFixed(2)}%` },
            { title: "Pool Creado", value: coin.poolCreated || 'N/A' },
        ];
    }, [coin]);

    const basicStats = useMemo(() => allStats.slice(0, 8), [allStats]);
    const advancedStats = useMemo(() => allStats.slice(8), [allStats]); 

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
            
            <main style={gridStyle}>
                <div style={{ gridArea: 'chart' }} className="min-h-[450px] relative">
                    <TradingViewChart />
                    <button 
                        onClick={() => setIsChatVisible(!isChatVisible)} 
                        className="absolute top-1/2 -translate-y-1/2 -right-3 z-20 p-1 bg-[#161B22] border border-[#30363D] rounded-full text-gray-400 hover:bg-cyan-500/20 hover:text-white" 
                        aria-label={isChatVisible ? "Ocultar chat" : "Mostrar chat"}
                    >
                        {isChatVisible ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
                    </button>
                </div>

                {/* Columna del chat - Si no está visible, grid-template-columns lo colapsará */}
                <div 
                    style={{ gridArea: 'chat', overflow: 'hidden' }} 
                    className={`flex flex-col min-h-0 bg-[#161B22] border border-[#30363D] rounded-xl ${!isChatVisible ? 'hidden' : ''}`}
                    // Agregué 'hidden' para asegurar que no ocupe espacio si isChatVisible es false
                >
                    {isChatVisible && (
                        <LiveChat coinId={coin.id} coinName={coin.name} isAuthenticated={isAuthenticated} />
                    )}
                </div>

                <div style={{ gridArea: 'trades' }} className="flex flex-col min-h-[500px] relative">
                    <TransactionList coinSymbol={coin.symbol} />
                    <button 
                        onClick={() => setIsSentimentVisible(!isSentimentVisible)} 
                        className="absolute top-1/2 -translate-y-1/2 -right-3 z-20 p-1 bg-[#161B22] border border-[#30363D] rounded-full text-gray-400 hover:bg-cyan-500/20 hover:text-white" 
                        aria-label={isSentimentVisible ? "Ocultar widgets de sentimiento" : "Mostrar widgets de sentimiento"}
                    >
                        {isSentimentVisible ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
                    </button>
                </div>
                
                {/* Columna de sentimientos - Si no está visible, grid-template-columns lo colapsará */}
                <div 
                    style={{ gridArea: 'sentiment', overflow: 'hidden' }} 
                    className={`flex flex-col space-y-4 min-h-0 ${!isSentimentVisible ? 'hidden' : ''}`}
                    // Agregué 'hidden' para asegurar que no ocupe espacio si isSentimentVisible es false
                >
                    {isSentimentVisible && (
                        <>
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
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CoinDetailPage;