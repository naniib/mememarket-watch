
import React from 'react';
import { Shield, X } from 'lucide-react';

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const auditChecks = [
    { label: 'Verified Contract', value: 'Yes' },
    { label: 'Honeypot', value: 'No' },
    { label: 'Buy Tax', value: '???' },
    { label: 'Sell Tax', value: '???' },
    { label: 'Proxy Contract', value: '-' },
    { label: 'Mintable', value: 'No' },
    { label: 'Tax Modifiable', value: 'No' },
    { label: 'Can Pause Trading', value: '-' },
    { label: 'Freezable', value: '-' },
    { label: 'Scam Risk', value: '???' },
    { label: 'Can Renounce Ownership', value: '-' },
    { label: 'Can Modify Balance', value: '-' },
    { label: 'Hidden Owner', value: '-' },
    { label: 'Self-Destructible', value: '-' },
    { label: 'External Call Risk', value: '-' },
    { label: 'Trading Cooldown', value: '-' },
    { label: 'Max Sell Ratio', value: '-' },
    { label: 'Whitelist', value: '-' },
    { label: 'Anti-Whale', value: '-' },
    { label: 'Anti-Whale Modifiable', value: '-' },
    { label: 'Trading Cooldown Change', value: '-' },
    { label: 'Personal Tax Modifiable', value: '-' },
    { label: 'Real or Fake Token', value: '-' },
    { label: 'Airdrop Scam', value: '-' },
    { label: 'Famous Token', value: '-' },
    { label: 'Owner Address', value: 'Token...Q5DA' },
    { label: 'Owner Balance', value: '-' },
    { label: 'Owner Percentage', value: '-' },
    { label: 'Creator Address', value: 'WLHv2...JVVh' },
    { label: 'Creator Balance', value: '-' },
    { label: 'Creator Percentage', value: '-' },
    { label: 'Pair Holders', value: '-' },
    { label: 'Other Risks', value: 'No' },
    { label: 'Note', value: '-' },
];

const getValueClass = (value: string) => {
    switch (value.toLowerCase()) {
        case 'yes':
        case 'no':
            return 'text-green-400';
        case '???':
            return 'text-yellow-400';
        case '-':
            return 'text-gray-500';
        default:
            return 'text-white font-mono';
    }
};

const AuditModal = ({ isOpen, onClose }: AuditModalProps) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
        >
            <div 
                className="relative w-full max-w-2xl bg-[#161B22] border border-[#30363D] rounded-xl shadow-lg shadow-cyan-500/10"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 flex justify-between items-center border-b border-gray-700/30">
                    <h2 id="audit-modal-title" className="text-xl font-bold text-white flex items-center">
                        <Shield className="w-6 h-6 mr-3 text-cyan-400" />
                        Security Audit
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <ul className="space-y-3">
                        {auditChecks.map((check, index) => (
                            <li key={index} className="flex items-center justify-between text-sm py-1 border-b border-gray-800/50">
                                <span className="text-gray-400">{check.label}</span>
                                <span className={`font-bold ${getValueClass(check.value)}`}>
                                    {check.value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <footer className="p-6 border-t border-gray-700/30">
                     <p className="text-xs text-gray-500 text-center">
                         Disclaimer: This is an automated audit and is for informational purposes only. It is not financial advice. Always conduct your own research.
                     </p>
                </footer>
            </div>
        </div>
    );
};

export default AuditModal;
