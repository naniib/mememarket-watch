
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface SecurityWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SecurityWarningModal = ({ isOpen, onClose }: SecurityWarningModalProps) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        // En una implementación real, aquí se abriría el enlace externo.
        // Por ahora, solo cerramos el modal como se solicitó.
        console.log("Usuario ha aceptado la advertencia y procedería al enlace externo.");
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="security-warning-title"
        >
            <div 
                className="relative w-full max-w-lg bg-[#0d1117] border border-yellow-500/50 rounded-2xl shadow-lg shadow-yellow-500/20"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-between items-center border-b border-yellow-500/20">
                    <h1 id="security-warning-title" className="text-2xl font-bold text-yellow-400 flex items-center">
                        <AlertTriangle className="w-7 h-7 mr-3" />
                        Advertencia de Seguridad
                    </h1>
                    <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <div className="p-6 space-y-4">
                    <p className="text-gray-300">
                        Estás a punto de salir de MemeMarketWatch para visitar un sitio web externo. Ten en cuenta los siguientes riesgos:
                    </p>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-start">
                            <AlertTriangle className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                            <span>Nunca compartas tus <strong>frases semilla</strong> o claves privadas.</span>
                        </li>
                        <li className="flex items-start">
                            <AlertTriangle className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                            <span>Desconfía de sitios que te pidan conectar tu wallet para acciones no solicitadas.</span>
                        </li>
                        <li className="flex items-start">
                             <AlertTriangle className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                            <span>MemeMarketWatch no se hace responsable del contenido de sitios de terceros.</span>
                        </li>
                    </ul>
                </div>

                <footer className="p-4 flex justify-end space-x-4 bg-gray-900/50 rounded-b-xl">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="px-6 py-2 font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
                    >
                        Entendido, Continuar
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SecurityWarningModal;