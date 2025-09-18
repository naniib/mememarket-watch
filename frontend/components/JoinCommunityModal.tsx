
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
                className="relative w-full max-w-md bg-[#0D1117] border border-[#30363D] rounded-xl shadow-2xl shadow-black/50"
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
                        <button 
                            onClick={onConnect}
                            className="w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg bg-[#161B22] border border-[#30363D] text-gray-300 hover:border-neon-green hover:text-neon-green transition-colors"
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Connect & Join
                        </button>
                        <button 
                            onClick={onClose}
                            className="font-semibold py-2 px-4 text-gray-500 hover:text-white transition-colors"
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