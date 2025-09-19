import React from 'react';
import { X, Users, Zap } from 'lucide-react';

interface JoinCommunityModalProps {
    onClose: () => void;
    onConnect: () => void;
}

const JoinCommunityModal = ({ onClose, onConnect }: JoinCommunityModalProps) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-community-title"
        >
            {/* CAMBIO 1: Borde y sombra con el color oficial */}
            <div 
                className="relative w-full max-w-md bg-[#0D1117] border border-emerald-400/30 rounded-xl shadow-2xl shadow-emerald-400/20"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 pt-12 text-center">
                    <Users size={32} className="mx-auto text-gray-500 mb-6" />
                    
                    <h1 id="join-community-title" className="text-3xl font-bold text-white mb-4">
                        Join the Degen Community!
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                        Connect your wallet to post, vote, and unlock all the features of MemeMarket Watch.
                    </p>
                    
                    <div className="flex flex-col items-center space-y-4">
                        {/* CAMBIO 2: Botón principal con el color oficial y efecto de brillo */}
                        <button 
                            onClick={onConnect}
                            className="w-full flex items-center justify-center font-bold py-3 px-4 rounded-lg bg-emerald-400 text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/40"
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Connect & Join
                        </button>

                        {/* CAMBIO 3: Botón secundario rediseñado (más pequeño y sutil) */}
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-semibold text-gray-300 border border-gray-700 rounded-lg transition-colors duration-200 hover:border-emerald-400 hover:text-emerald-400"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinCommunityModal;