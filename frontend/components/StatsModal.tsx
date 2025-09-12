
import React from 'react';
import { X, Info } from 'lucide-react';
// Importamos StatCard y StatCardProps del CoinDetailPage
import { StatCard, StatCardProps } from '../pages/CoinDetailPage'; 

interface StatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    advancedStats: StatCardProps[]; 
}

const StatsModal = ({ isOpen, onClose, advancedStats }: StatsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
            <div 
                className="bg-gradient-to-br from-[#10141a] to-[#0D1117] border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/10 w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
                <header className="flex items-center justify-between p-6 border-b border-gray-700/50 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Info size={24} className="text-white"/>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
                            Información Adicional del Token
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </header>
                
                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {advancedStats.map((stat, index) => (
                            <StatCard key={stat.title || index} {...stat} /> 
                        ))}
                    </div>
                </div>

                <footer className="p-6 border-t border-gray-700/50 flex-shrink-0 text-center">
                    <button 
                        onClick={onClose} 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 px-8 rounded-lg text-base transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
                    >
                        Cerrar
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default StatsModal;