import React from 'react';
import { ChevronDown, Users, X } from 'lucide-react';

interface TopHoldersModalProps {
    isOpen: boolean;
    onClose: () => void;
    topHolders: { rank: number; address: string; percentage: number }[];
}

const TopHoldersModal = ({ isOpen, onClose, topHolders }: TopHoldersModalProps) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="top-holders-title"
        >
            <div 
                className="relative w-full max-w-2xl bg-black border border-[#00f5b3]/30 rounded-2xl shadow-lg shadow-[#00f5b3]/20 animate-fade-in"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 flex justify-between items-center border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6 text-[#00f5b3]" />
                        <h3 id="top-holders-title" className="text-xl font-bold text-white">Top 10 Holders</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <ul className="space-y-4">
                        {topHolders.map(h => (
                            <li key={h.rank}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <div className="flex items-center space-x-3">
                                        <span className="flex items-center justify-center font-bold text-xs text-white w-7 h-7 bg-gradient-to-tr from-green-600 to-teal-700 rounded-full flex-shrink-0">
                                            #{h.rank}
                                        </span>
                                        <span className="text-gray-300 font-mono truncate hover:underline cursor-pointer" title={h.address}>{h.address}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 flex-shrink-0">
                                        <span className="font-bold text-white">{h.percentage}%</span>
                                        <div className="w-24 bg-gray-800 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-green-500 to-[#00f5b3] h-2 rounded-full" style={{ width: `${h.percentage}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TopHoldersModal;