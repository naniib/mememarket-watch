import React, { useState } from 'react';
import { ChevronDown, Copy, ExternalLink, Calendar, Pause, ChevronsLeft, ChevronsRight, ArrowDown, ArrowUp, X, Hash, User, TrendingUp, TrendingDown } from 'lucide-react';

interface TransactionListProps {
    coinSymbol: string;
}

// --- MOCK DATA ---
const mockAdvancedTransactions = [
    { date: 'Aug 29 12:01:07', type: 'buy', priceUSD: 0.002700, totalUSD: 198.90, priceSOL: 0.041299, amountMemecoin: 73662.90, amountSOL: 0.82, maker: '8tq4y...VtDb', otherTxCount: 99, txId: '5h...jK' },
    { date: 'Aug 29 12:00:18', type: 'buy', priceUSD: 0.002694, totalUSD: 13.69, priceSOL: 0.041297, amountMemecoin: 5082.89, amountSOL: 0.05, maker: 'FatLL...XgKv', otherTxCount: 99, txId: '3a...Lp' },
    { date: 'Aug 29 12:00:18', type: 'sell', priceUSD: 0.002686, totalUSD: 397.65, priceSOL: 0.041293, amountMemecoin: 148047.00, amountSOL: 1.62, maker: 'FUNDd...jrBU', otherTxCount: 99, txId: '2b...Qz' },
    { date: 'Aug 29 11:54:58', type: 'buy', priceUSD: 0.002702, totalUSD: 5.89, priceSOL: 0.041302, amountMemecoin: 2182.49, amountSOL: 0.02, maker: '7HUZN...YQ2y', otherTxCount: 7, txId: '4c...Mn' },
    { date: 'Aug 29 11:53:52', type: 'buy', priceUSD: 0.002698, totalUSD: 1.367, priceSOL: 0.041302, amountMemecoin: 50.65, amountSOL: 0.01, maker: 'GCVhH...PzvM', otherTxCount: 99, txId: '1d...Fg' },
    { date: 'Aug 29 11:53:00', type: 'buy', priceUSD: 0.002697, totalUSD: 2.91, priceSOL: 0.041302, amountMemecoin: 1080.58, amountSOL: 0.01, maker: 'ProCX...Dc5u', otherTxCount: 4, txId: '6e...Wx' },
    { date: 'Aug 29 11:52:47', type: 'sell', priceUSD: 0.002689, totalUSD: 357.49, priceSOL: 0.041298, amountMemecoin: 132946.00, amountSOL: 1.45, maker: '5hcV8...BQ49', otherTxCount: 3, txId: '9f...Za' },
    { date: 'Aug 29 11:52:47', type: 'buy', priceUSD: 0.002707, totalUSD: 5.06, priceSOL: 0.041307, amountMemecoin: 1870.27, amountSOL: 0.02, maker: 'GTf4r...k8Wi', otherTxCount: 84, txId: '7g...Yx' },
    { date: 'Aug 29 11:52:47', type: 'sell', priceUSD: 0.002699, totalUSD: 430.50, priceSOL: 0.041303, amountMemecoin: 159466.00, amountSOL: 1.75, maker: 'GtUpP...0w9m', otherTxCount: 16, txId: '8h...Ab' },
];
type Transaction = typeof mockAdvancedTransactions[0];


// --- HELPER COMPONENTS ---
const SolanaIcon = () => <svg role="img" className="w-4 h-4" viewBox="0 0 24 24" fill="url(#sol_grad_list)" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sol_grad_list" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#00FFA3" /><stop offset="100%" stopColor="#DC1FFF" /></linearGradient></defs><path d="M4.262 18.883l3.336-1.933a.4.4 0 00.2-.347V7.393a.4.4 0 00-.2-.347L4.262 5.113a.4.4 0 00-.6.347v13.076a.4.4 0 00.6.347zM9.138 21.013l3.336-1.933a.4.4 0 00.2-.347V9.573a.4.4 0 00-.2-.347L9.138 7.293a.4.4 0 00-.6.347v13.026a.4.4 0 00.6.347zM14.013 16.743l3.336-1.933a.4.4 0 00.2-.347V4.303a.4.4 0 00-.2-.347l-3.336-1.93a.4.4 0 00-.6.346v13.98a.4.4 0 00.6.347zM18.888 18.883l-3.336-1.933a.4.4 0 01-.2-.347V7.393a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.076a.4.4 0 01-.6.347zM13.988 21.013l-3.336-1.933a.4.4 0 01-.2-.347V9.573a.4.4 0 01.2-.347l3.336-1.933a.4.4 0 01.6.347v13.026a.4.4 0 01-.6.347zM9.113 16.743l-3.336-1.933a.4.4 0 01-.2-.347V4.303a.4.4 0 01.2-.347l3.336-1.93a.4.4 0 01.6.346v13.98a.4.4 0 01-.6.347z"/></svg>;
const SortIcon = () => <div className="inline-flex flex-col space-y-0.5 ml-1"><ArrowUp size={8} className="text-gray-600" /><ArrowDown size={8} /></div>;

// --- TRANSACTION DETAIL MODAL COMPONENT ---
interface TransactionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    coinSymbol: string;
}

const InfoCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-[#00f5b3] mb-3">
            {icon}
            <h4 className="font-bold">{title}</h4>
        </div>
        <div className="space-y-2 text-sm">{children}</div>
    </div>
);

const InfoRow = ({ label, value, valueClass = '' }: { label: string, value: React.ReactNode, valueClass?: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400">{label}</span>
        <span className={`font-mono font-semibold text-white ${valueClass}`}>{value}</span>
    </div>
);

const TransactionDetailModal = ({ isOpen, onClose, transaction, coinSymbol }: TransactionDetailModalProps) => {
    if (!isOpen || !transaction) return null;

    const pnl = (0.0028 - transaction.priceUSD) * transaction.amountMemecoin;
    const isProfit = pnl >= 0;

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tx-detail-title"
        >
            <div
                className="relative w-full max-w-3xl bg-black border border-[#00f5b3]/30 rounded-2xl shadow-lg shadow-[#00f5b3]/20"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-gray-800">
                    <h3 id="tx-detail-title" className="text-xl font-bold text-white">Transaction Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6 grid md:grid-cols-3 gap-4">
                    <InfoCard title="Transaction" icon={<Hash size={16} />}>
                        <InfoRow label="TX ID" value={
                            <a href="#" className="text-[#00f5b3] hover:underline flex items-center gap-1">
                                {transaction.txId} <Copy size={12} />
                            </a>
                        } />
                        <InfoRow label="Explorer" value={
                            <a href="#" className="text-[#00f5b3] hover:underline flex items-center gap-1">
                                Solscan <ExternalLink size={12} />
                            </a>
                        } />
                        <InfoRow label="Date" value={transaction.date} />
                        <InfoRow label="Type" value={transaction.type} valueClass={transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'} />
                    </InfoCard>

                    <InfoCard title="P&L Analysis" icon={isProfit ? <TrendingUp size={16} /> : <TrendingDown size={16} />}>
                        <InfoRow label="Unrealized P&L" value={`$${pnl.toFixed(2)}`} valueClass={isProfit ? 'text-green-400' : 'text-red-400'} />
                        <InfoRow label="Entry Price" value={`$${transaction.priceUSD.toFixed(6)}`} />
                        <InfoRow label="Current Price" value="$0.002800" />
                    </InfoCard>
                    
                    <InfoCard title="Maker" icon={<User size={16} />}>
                         <InfoRow label="Address" value={
                            <a href="#" className="text-[#00f5b3] hover:underline flex items-center gap-1">
                                {transaction.maker} <Copy size={12} />
                            </a>
                        } />
                        <InfoRow label={`Trades (${coinSymbol})`} value={transaction.otherTxCount} />
                        <InfoRow label="Est. P&L" value="$1,234.56" valueClass="text-green-400" />
                        <InfoRow label="Win Rate" value="78%" />
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};


const TransactionList = ({ coinSymbol }: TransactionListProps) => {
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    
    const getSizeEmoji = (totalUSD: number): string => {
        if (totalUSD > 300) return '🏆';
        if (totalUSD > 50) return '🌟';
        return '🪣';
    };

    return (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg h-full flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700"><Pause size={14} /></button>
                    <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700"><Calendar size={14} /></button>
                </div>
                <h3 className="text-lg font-bold text-white">Trades</h3>
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700"><ChevronsLeft size={14} /></button>
                    <button className="p-1.5 bg-gray-800 rounded hover:bg-gray-700"><ChevronsRight size={14} /></button>
                </div>
            </div>

            <div className="text-xs font-mono text-gray-400 flex-grow flex flex-col min-h-0">
                <div className="grid grid-cols-12 gap-x-2 px-3 py-2 border-b border-gray-800 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10 flex-shrink-0">
                    <div className="col-span-2 flex items-center">Fecha <SortIcon /></div>
                    <div className="col-span-1">Tipo</div>
                    <div className="col-span-1 flex items-center">Precio <SortIcon /></div>
                    <div className="col-span-1 flex items-center">Total <SortIcon /></div>
                    <div className="col-span-2 flex items-center">Precio SOL <SortIcon /></div>
                    <div className="col-span-2 flex items-center">Cantidad {coinSymbol} <SortIcon /></div>
                    <div className="col-span-1 flex items-center">Cantidad SOL <SortIcon /></div>
                    <div className="col-span-1">Maker</div>
                    <div className="col-span-1">Otros</div>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    {mockAdvancedTransactions.map((tx, i) => (
                        <div key={i} className="grid grid-cols-12 gap-x-2 items-center px-3 py-2.5 border-b border-gray-900 transition-colors duration-200 hover:bg-gray-900/50">
                            <div className="col-span-2">{tx.date}</div>
                            <div className={`col-span-1 font-bold ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{tx.type}</div>
                            <div className={`col-span-1 ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{tx.priceUSD.toFixed(6)}</div>
                            <div className="col-span-1 flex items-center gap-1">
                                <span>{getSizeEmoji(tx.totalUSD)}</span> ${tx.totalUSD.toFixed(2)}
                            </div>
                            <div className="col-span-2">{tx.priceSOL.toFixed(6)}</div>
                            <div className="col-span-2">{tx.amountMemecoin.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
                            <div className="col-span-1">{tx.amountSOL.toFixed(4)}</div>
                            <div className="col-span-1">
                                <a href="#" onClick={(e) => e.preventDefault()} className="text-[#00f5b3] hover:underline flex items-center">{tx.maker} <Copy size={12} className="ml-1" /></a>
                            </div>
                            <div className="col-span-1 flex items-center justify-between">
                                <SolanaIcon />
                                <span className="bg-gray-700 text-green-300 text-xs font-bold px-1.5 py-0.5 rounded-md">
                                    +{tx.otherTxCount}
                                </span>
                                <button onClick={() => setSelectedTx(tx)} className="text-gray-500 hover:text-white p-1 -mr-1" aria-label="View transaction details">
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             <TransactionDetailModal 
                isOpen={!!selectedTx} 
                onClose={() => setSelectedTx(null)} 
                transaction={selectedTx} 
                coinSymbol={coinSymbol} 
            />
        </div>
    );
};

export default TransactionList;