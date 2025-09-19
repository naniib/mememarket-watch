import React from 'react'; // <-- ASEGÚRATE DE QUE LA PRIMERA LÍNEA SEA ASÍ
import { Shield, X, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AuditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const auditData = {
    risk: 'Medium', // Could be 'Low', 'Medium', 'High'
    summary: 'Several points require attention. The contract is not mintable, but the taxes are unknown and ownership has not been renounced.',
    checks: {
        'Contract Analysis': [
            { label: 'Verified Contract', value: 'Yes', status: 'pass' },
            { label: 'Proxy Contract', value: 'No', status: 'pass' },
            { label: 'Mintable', value: 'No', status: 'pass' },
            { label: 'Can Renounce Ownership', value: 'Yes', status: 'warn' },
            { label: 'Hidden Owner', value: 'No', status: 'pass' },
            { label: 'Self-Destructible', value: 'No', status: 'pass' },
            { label: 'External Call Risk', value: 'Low', status: 'pass' },
            { label: 'Can Modify Balance', value: 'No', status: 'pass' },
        ],
        'Transaction Analysis': [
            { label: 'Honeypot', value: 'No', status: 'pass' },
            { label: 'Buy Tax', value: '???', status: 'warn' },
            { label: 'Sell Tax', value: '???', status: 'warn' },
            { label: 'Tax Modifiable', value: 'No', status: 'pass' },
            { label: 'Can Pause Trading', value: 'No', status: 'pass' },
            { label: 'Freezable', value: 'No', status: 'pass' },
            { label: 'Trading Cooldown', value: 'No', status: 'pass' },
            { label: 'Max Sell Ratio', value: 'None', status: 'pass' },
            { label: 'Whitelist', value: 'No', status: 'pass' },
            { label: 'Anti-Whale', value: 'No', status: 'pass' },
        ],
        'Ownership & Holders': [
            { label: 'Owner Address', value: 'Token...Q5DA', status: 'info' },
            { label: 'Owner Balance', value: '0.5 ETH', status: 'info' },
            { label: 'Owner Percentage', value: '1.2%', status: 'info' },
            { label: 'Creator Address', value: 'WLHv2...JVVh', status: 'info' },
            { label: 'Creator Balance', value: '0.0 ETH', status: 'info' },
            { label: 'Creator Percentage', value: '0.0%', status: 'info' },
        ]
    }
};

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'pass': return { Icon: CheckCircle, color: 'text-green-400' };
        case 'warn': return { Icon: AlertTriangle, color: 'text-yellow-400' };
        case 'fail': return { Icon: XCircle, color: 'text-red-400' };
        default: return { Icon: () => null, color: 'text-white font-mono' };
    }
};

const getRiskBannerStyle = (risk: string) => {
    switch (risk.toLowerCase()) {
        case 'low': return 'bg-green-900/80 text-green-300 border-green-500/50';
        case 'medium': return 'bg-yellow-900/80 text-yellow-300 border-yellow-500/50';
        case 'high': return 'bg-red-900/80 text-red-300 border-red-500/50';
        default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
}

const AuditModal = ({ isOpen, onClose }: AuditModalProps) => {
    if (!isOpen) return null;

    const { risk, summary, checks } = auditData;
    const riskBannerStyle = getRiskBannerStyle(risk);

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
        >
            <div 
                className="relative w-full max-w-3xl bg-black border border-gray-800 rounded-2xl shadow-lg shadow-[#00f5b3]/10"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-6 flex justify-between items-center border-b border-gray-800">
                    <h2 id="audit-modal-title" className="text-xl font-bold text-white flex items-center">
                        <Shield className="w-6 h-6 mr-3 text-[#00f5b3]" />
                        Security Audit
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Risk Summary Section */}
                    <div className={`p-4 rounded-lg border text-center mb-6 ${riskBannerStyle}`}>
                        <p className="font-bold text-lg">RISK ASSESSMENT: {risk.toUpperCase()}</p>
                        <p className="text-sm mt-1">{summary}</p>
                    </div>

                    {/* Detailed Checks */}
                    <div className="space-y-6">
                        {Object.entries(checks).map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold text-[#00f5b3] border-b border-[#00f5b3]/20 pb-2 mb-4">{category}</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                    {items.map((check, index) => {
                                        const { Icon, color } = getStatusStyles(check.status);
                                        return (
                                            <li key={index} className="flex items-center justify-between text-sm py-1">
                                                <span className="text-gray-400">{check.label}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`font-bold ${color}`}>
                                                        {check.value}
                                                    </span>
                                                    <Icon className={`w-4 h-4 ${color}`} />
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="p-4 border-t border-gray-800 bg-black/50 rounded-b-2xl">
                       <p className="text-xs text-gray-500 text-center">
                           Disclaimer: This is an automated audit and is for informational purposes only. It is not financial advice. Always conduct your own research.
                       </p>
                </footer>
            </div>
        </div>
    );
};

export default AuditModal;
