
import React from 'react';
import { LogIn } from 'lucide-react';

interface AccountRequiredModalProps {
    onClose: () => void;
    onOpenAuthModal: () => void;
}

const AccountRequiredModal = ({ onClose, onOpenAuthModal }: AccountRequiredModalProps) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-required-title"
        >
            <div 
                className="relative w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-xl shadow-xl shadow-black/20"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 text-center">
                    <h1 id="account-required-title" className="text-2xl font-bold text-white mb-4">
                        Account required!
                    </h1>
                    <p className="text-gray-400 mb-8 text-lg">
                        Please{' '}
                        <button 
                            onClick={onOpenAuthModal}
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105"
                        >
                            <LogIn className="inline-block w-4 h-4 mr-1.5" />
                            Sign in
                        </button>
                        {' '}to proceed.
                    </p>
                    
                    <a 
                        href="#/" 
                        onClick={onClose}
                        className="text-sm text-gray-500 hover:text-cyan-400 hover:underline"
                    >
                        Go back to Home Page
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AccountRequiredModal;