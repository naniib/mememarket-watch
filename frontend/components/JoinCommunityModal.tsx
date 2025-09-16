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
            <div 
                className="relative w-full max-w-md bg-gradient-to-br from-[#10141a] to-[#0D1117] border border-neon-green/30 rounded-2xl shadow-2xl shadow-neon-green/10"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-end items-center">
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <div className="p-8 pt-0 text-center">
                    <div className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center text-black mx-auto mb-6 shadow-lg">
                        <Users size={40} />
                    </div>
                    
                    <h1 id="join-community-title" className="text-3xl font-bold text-white mb-4">
                        Join the Degen Community!
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Connect your wallet to post, vote, and unlock all the features of MemeMarket Watch.
                    </p>
                    
                    <div className="flex flex-col space-y-3">
                        <button 
                            onClick={onConnect}
                            className="w-full flex items-center justify-center text-lg font-bold py-3 px-4 rounded-lg bg-neon-green text-black hover:opacity-90 transition-opacity"
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Connect & Join
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full font-semibold py-3 px-4 rounded-lg text-gray-400 hover:bg-gray-800/50 transition-colors"
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