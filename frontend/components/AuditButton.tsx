import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Coin } from '../data';

interface AuditButtonProps {
    coin: Coin;
    onOpen: () => void;
}

const AuditButton = ({ coin, onOpen }: AuditButtonProps) => {
    const riskData = {
        LOW: {
            color: 'bg-green-900/80 text-green-300 border-green-500/50 hover:bg-green-900',
            icon: <CheckCircle className="w-4 h-4 mr-2" />,
            text: 'Security Audit: LOW RISK'
        },
        MEDIUM: {
            color: 'bg-yellow-900/80 text-yellow-300 border-yellow-500/50 hover:bg-yellow-900',
            icon: <AlertTriangle className="w-4 h-4 mr-2" />,
            text: 'Security Audit: MEDIUM RISK'
        },
        HIGH: {
            color: 'bg-red-900/80 text-red-300 border-red-500/50 hover:bg-red-900',
            icon: <Shield className="w-4 h-4 mr-2" />,
            text: 'Security Audit: HIGH RISK'
        },
    }[coin.audit.risk];

    const handleClick = () => {
        onOpen();
    };

    return (
        <button 
            onClick={handleClick}
            className={`w-full font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center ${riskData.color} border`}
        >
            {riskData.icon}
            {riskData.text}
        </button>
    );
};

export default AuditButton;