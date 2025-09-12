import React from 'react';
import { X } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Información Adicional del Token</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {advancedStats.map((stat, index) => (
                        <StatCard key={stat.title || index} {...stat} /> // Usamos stat.title como key si existe, si no index
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button onClick={onClose} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;