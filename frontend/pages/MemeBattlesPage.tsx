import React, { useState } from 'react';

interface User {
    id: number;
    username: string;
}

interface MemeBattlesPageProps {
    user: User | null;
    onOpenJoinCommunityModal: () => void;
}

const MemeBattlesPage = ({ user, onOpenJoinCommunityModal }: MemeBattlesPageProps) => {
    const [activeArena, setActiveArena] = useState('Batallas Relámpago');
    const [activeTimeframe, setActiveTimeframe] = useState('1 Minuto');
    const [betAmount, setBetAmount] = useState('');
    const [selectedChoice, setSelectedChoice] = useState<'pump' | 'dump' | null>(null);

    const arenas = ["Batallas Relámpago", "Batallas Tácticas", "Eventos Especiales"];
    const timeframes = ["1 Minuto", "5 Minutos", "15 Minutos"];

    const handleConfirmVote = () => {
        if (!user) {
            onOpenJoinCommunityModal();
            return;
        }

        if (!betAmount.trim() || !selectedChoice) {
            alert('Por favor, selecciona PUMP o DUMP e introduce una cantidad de puntos.');
            return;
        }
        alert(`¡Voto confirmado! Has apostado ${betAmount} puntos a que hará ${selectedChoice}.`);
        setBetAmount('');
        setSelectedChoice(null);
    };

    return (
        <main className="w-full">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
                <h1 className="text-xl font-bold">La Arena MMW</h1>
            </header>
            <div className="p-5 flex flex-col items-center">
                {/* Selector de Arenas */}
                <div className="flex space-x-2 md:space-x-4 bg-[#161B22] border border-[#30363D] p-2 rounded-xl mb-6">
                    {arenas.map(arena => (
                        <button
                            key={arena}
                            onClick={() => setActiveArena(arena)}
                            className={`font-bold py-2 px-3 sm:px-6 rounded-lg text-base sm:text-lg transition-colors duration-200 ${
                                activeArena === arena
                                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                                : 'bg-transparent text-gray-400 hover:bg-[#30363D]'
                            }`}
                        >
                            {arena}
                        </button>
                    ))}
                </div>

                {/* Selector de Temporalidades (para Batallas Relámpago) */}
                {activeArena === 'Batallas Relámpago' && (
                    <div className="flex space-x-2 mb-8">
                        {timeframes.map(timeframe => (
                             <button
                                key={timeframe}
                                onClick={() => setActiveTimeframe(timeframe)}
                                className={`text-sm px-4 py-1.5 rounded-md border transition-colors duration-200 ${
                                    activeTimeframe === timeframe
                                    ? 'bg-gray-700 text-white border-[#4A5568]'
                                    : 'bg-[#161B22] text-gray-400 hover:bg-gray-700 border-[#30363D]'
                                }`}
                            >
                                {timeframe}
                            </button>
                        ))}
                    </div>
                )}
                
                {/* Contenido de la Arena */}
                {activeArena === 'Batallas Relámpago' && (
                    <div className="w-full max-w-4xl bg-[#161B22] border border-[#30363D] rounded-xl p-6 animate-fade-in">
                        {/* 1. Título del Token y Contador */}
                        <div className="text-center mb-6">
                            <div className="flex justify-center items-center space-x-4 mb-2">
                                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl">🚀</div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white">Doge2Moon</h2>
                                    <p className="text-gray-400">$DOGE2</p>
                                </div>
                            </div>
                            <p className="text-gray-400">La batalla termina en <span className="font-mono text-xl font-bold text-yellow-400">00:59:03</span></p>
                        </div>

                        {/* 3. Barra de Tensión */}
                        <div className="w-full bg-red-500/30 rounded-full h-6 overflow-hidden border-2 border-gray-600 my-8">
                            <div className="bg-green-500 h-full" style={{ width: '60%' }} title="60% Bulls vs 40% Bears"></div>
                        </div>

                        {/* 4. Zonas de Votación */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sección Izquierda - Bulls */}
                            <div className="text-center p-4 bg-green-900/30 border-2 border-green-500/50 rounded-lg">
                                <button
                                    onClick={() => setSelectedChoice('pump')}
                                    className={`w-full h-32 text-4xl font-black bg-green-600 hover:bg-green-700 rounded-lg transition-all hover:scale-105 ${
                                        selectedChoice === 'pump' ? 'border-2 border-green-400 shadow-lg shadow-green-500/50' : ''
                                    }`}
                                >
                                    PUMP IT! 🐂
                                </button>
                                <p className="mt-3 text-gray-400">
                                    <span className="font-bold text-white text-lg">1,250,000</span> Puntos Apostados
                                </p>
                            </div>
                            {/* Sección Derecha - Bears */}
                            <div className="text-center p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
                                <button
                                    onClick={() => setSelectedChoice('dump')}
                                    className={`w-full h-32 text-4xl font-black bg-red-600 hover:bg-red-700 rounded-lg transition-all hover:scale-105 ${
                                        selectedChoice === 'dump' ? 'border-2 border-red-400 shadow-lg shadow-red-500/50' : ''
                                    }`}
                                >
                                    DUMP IT! 🐻
                                </button>
                                <p className="mt-3 text-gray-400">
                                    <span className="font-bold text-white text-lg">850,000</span> Puntos Apostados
                                </p>
                            </div>
                        </div>

                        {/* 5. Tu Apuesta */}
                        <div className="mt-8 border-t border-gray-700 pt-6">
                            <h3 className="text-lg font-bold text-center text-white mb-4">Haz tu jugada</h3>
                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <label htmlFor="bet-amount" className="sr-only">Cantidad de la apuesta</label>
                                <input
                                    id="bet-amount"
                                    type="number"
                                    placeholder="Puntos a apostar"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(e.target.value)}
                                    className="w-full sm:w-64 bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white text-lg font-mono"
                                />
                                <button
                                    onClick={handleConfirmVote}
                                    className="w-full sm:w-auto text-lg font-bold py-3 px-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-opacity"
                                >
                                    Confirmar Voto
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                 {/* Marcadores de posición para otras arenas */}
                {activeArena === 'Batallas Tácticas' && (
                    <div className="text-center text-gray-400 p-10 bg-[#161B22] border border-dashed border-[#30363D] rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-2">Batallas Tácticas</h2>
                        <p>Próximamente: Batallas semanales con mayores recompensas.</p>
                    </div>
                )}
                {activeArena === 'Eventos Especiales' && (
                    <div className="text-center text-gray-400 p-10 bg-[#161B22] border border-dashed border-[#30363D] rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-2">Eventos Especiales</h2>
                        <p>Próximamente: Torneos y competiciones patrocinadas.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MemeBattlesPage;