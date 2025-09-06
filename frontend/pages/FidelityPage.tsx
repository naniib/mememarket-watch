

import React from 'react';
import { Diamond, Flame, User, Calendar, Edit, ThumbsUp, Users, UserPlus, Trophy } from 'lucide-react';

// --- COMPONENTES DE DISEÑO ---

// Tarjeta de Logro rediseñada como Medalla
const AchievementCard = ({ icon: Icon, title, value, footer, iconBgClass }: { icon: React.ElementType, title: string, value: string, footer: string, iconBgClass: string }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${iconBgClass}`}>
            <Icon size={32} className="text-white drop-shadow-lg" />
        </div>
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-2xl font-mono font-bold text-white my-1">{value}</p>
        <p className="text-xs text-gray-400">{footer}</p>
    </div>
);

// Elemento de la lista del Salón de la Fama
const LeaderboardItem = ({ rank, username, points }: { rank: number, username: string, points: number }) => {
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1: return { medal: '🥇', text: 'text-yellow-400' };
            case 2: return { medal: '🥈', text: 'text-gray-300' };
            case 3: return { medal: '🥉', text: 'text-orange-400' };
            default: return { medal: `#${rank}`, text: 'text-gray-500' };
        }
    };
    const { medal, text } = getRankStyle(rank);

    return (
        <li className="flex items-center justify-between p-3 bg-gray-800/30 rounded-md">
            <div className="flex items-center space-x-4">
                <span className={`font-bold text-lg w-8 text-center ${text}`}>{medal}</span>
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white">
                    {username.charAt(0)}
                </div>
                <span className="font-semibold text-white">{username}</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-cyan-400">
                <Diamond size={16} />
                <span>{points.toLocaleString()}</span>
            </div>
        </li>
    );
};


// --- PÁGINA PRINCIPAL ---

const FidelityPage = () => {
    const currentRank = "Degen de Bronce";
    const currentPoints = 1250;
    const nextRankPoints = 2000;
    const dailyStreak = 7;
    const progressPercentage = (currentPoints / nextRankPoints) * 100;

    const achievements = [
        { icon: User, title: "Perfil Completo", value: "75%", footer: "¡Casi lo tienes!", iconBgClass: "bg-gradient-to-br from-cyan-500 to-blue-600" },
        { icon: Users, title: "Seguidores", value: "8 / 20", footer: "Crea contenido de valor", iconBgClass: "bg-gradient-to-br from-teal-500 to-green-600" },
        { icon: UserPlus, title: "Siguiendo", value: "15 / 25", footer: "Conecta con la comunidad", iconBgClass: "bg-gradient-to-br from-sky-500 to-indigo-600" },
        { icon: Edit, title: "Posts Creados", value: "5 / 10", footer: "Siguiente hito", iconBgClass: "bg-gradient-to-br from-purple-500 to-violet-600" },
        { icon: ThumbsUp, title: "Votos Emitidos", value: "23 / 50", footer: "Siguiente hito", iconBgClass: "bg-gradient-to-br from-pink-500 to-rose-600" },
        { icon: Calendar, title: "Antigüedad", value: "3 Meses", footer: "Miembro de la comunidad", iconBgClass: "bg-gradient-to-br from-gray-600 to-gray-800" },
    ];

    const leaderboard = [
        { rank: 1, username: 'CryptoKing', points: 9870 },
        { rank: 2, username: 'MemeLord', points: 8120 },
        { rank: 3, username: 'DiamondHand', points: 7650 },
        { rank: 4, username: 'ApeTrader', points: 6400 },
        { rank: 5, username: 'You', points: 1250 },
    ];

    return (
        <section className="col-span-2 border-r border-gray-800 max-w-[800px] w-full mx-auto">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
                <h1 className="text-xl font-bold flex items-center">
                    <Trophy className="mr-2 text-yellow-400" />
                    Fidelity
                </h1>
            </header>

            <div className="p-6 space-y-12">
                {/* --- TARJETA DE ESTATUS PRINCIPAL --- */}
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center animate-fade-in shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/20">
                    <h2 className="text-sm text-gray-400 uppercase tracking-widest">Rango Actual</h2>
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent my-2 drop-shadow-[0_2px_4px_rgba(252,211,77,0.3)]">{currentRank}</h3>
                    
                    <div className="flex items-center justify-center space-x-8 text-gray-300 my-6 text-lg">
                        <div className="flex items-center space-x-2">
                            <Diamond size={20} className="text-cyan-400" />
                            <span>{currentPoints.toLocaleString()} Puntos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Flame size={20} className="text-orange-400" />
                            <span>Racha de {dailyStreak} días</span>
                        </div>
                    </div>

                    <div>
                        <div className="w-full bg-gray-700/50 rounded-full h-4 border border-gray-600 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2 font-mono">
                            {currentPoints.toLocaleString()} / {nextRankPoints.toLocaleString()} para el siguiente rango
                        </p>
                    </div>
                </div>

                {/* --- SECCIÓN DE LOGROS --- */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">Arsenal de Logros</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {achievements.map((ach, index) => (
                            <AchievementCard key={index} {...ach} />
                        ))}
                    </div>
                </div>

                {/* --- SECCIÓN SALÓN DE LA FAMA --- */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">Salón de la Fama</h3>
                    <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                        <ul className="space-y-3">
                            {leaderboard.map(item => (
                                <LeaderboardItem key={item.rank} {...item} />
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FidelityPage;