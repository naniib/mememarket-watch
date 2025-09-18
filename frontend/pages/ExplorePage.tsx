import React, { useState } from 'react';
import { ShieldCheck, Flame, User, Diamond } from 'lucide-react';

// --- Datos de Ejemplo ---
const polishedGems = [
  { rank: 1, name: 'AstroCat', votes: 1234, emoji: '🐱' },
  { rank: 2, name: 'PixelPup', votes: 1102, emoji: '🐶' },
  { rank: 3, name: 'QuantumQuokka', votes: 987, emoji: '🐨' },
  { rank: 4, name: 'CyberCorgi', votes: 854, emoji: '🐕' },
  { rank: 5, name: 'SolarisSnake', votes: 731, emoji: '🐍' },
];

const upcomingLaunches = [
  { name: 'GigaChadGPT', time: 'Listado hace 3 horas', buzz: 90, emoji: '💪' },
  { name: 'WojakInu', time: 'Listado hace 8 horas', buzz: 75, emoji: '😢' },
  { name: 'PepeChain', time: 'Listado hace 1 día', buzz: 60, emoji: '🐸' },
  { name: 'DogeFi', time: 'Listado hace 2 días', buzz: 45, emoji: '⛓️' },
  { name: 'ShibaSwap 2.0', time: 'Listado hace 3 días', buzz: 30, emoji: '🔄' },
  { name: 'MoonShotX', time: 'Listado hace 4 días', buzz: 20, emoji: '🌕' },
];

const topHunters = [
  { rank: 1, username: '@annie', score: 1250, avatar: 'https://i.pravatar.cc/150?u=annie' },
  { rank: 2, username: '@nelson', score: 1100, avatar: 'https://i.pravatar.cc/150?u=nelson' },
  { rank: 3, username: '@juan', score: 950, avatar: 'https://i.pravatar.cc/150?u=juan' },
  { rank: 4, username: '@maria', score: 800, avatar: 'https://i.pravatar.cc/150?u=maria' },
  { rank: 5, username: '@carlos', score: 720, avatar: 'https://i.pravatar.cc/150?u=carlos' },
];


// --- Componentes de Contenido para cada Pestaña ---

const PolishedGems = () => (
  <div className="p-6 space-y-4">
    <h2 className="text-2xl font-bold text-white mb-4">💎 Gemas Pulidas</h2>
    <ol className="space-y-3">
      {polishedGems.map(gem => (
        <li key={gem.rank} className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 flex items-center justify-between transition-all hover:border-neon-green/50 hover:bg-[#1D2127]">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-gray-500 w-8 text-center">{gem.rank}</span>
            <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center text-2xl">{gem.emoji}</div>
            <span className="font-semibold text-white text-lg">{gem.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-neon-green">
              <ShieldCheck size={20} />
              <span className="text-sm font-semibold">Confianza Alta</span>
            </div>
            <span className="text-gray-400 text-sm font-mono">{gem.votes.toLocaleString()} votos</span>
          </div>
        </li>
      ))}
    </ol>
    <div className="mt-6 text-center">
       <h4 className="font-bold text-white">High Risk by Design. Minimized Risk among Degens.</h4>
       <p className="text-sm text-gray-500">This ranking combines community votes with the security analysis of each contract.</p>
    </div>
  </div>
);

const UpcomingLaunches = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4">🚀 Lanzamientos en la Mira</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {upcomingLaunches.map(launch => (
        <div key={launch.name} className="border border-electric-purple/50 rounded-lg p-4 bg-[#161B22] flex flex-col items-center space-y-3 transition-all hover:bg-electric-purple/10 hover:shadow-lg hover:shadow-electric-purple/20">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center text-3xl">{launch.emoji}</div>
          <h3 className="font-bold text-white text-lg">{launch.name}</h3>
          <p className="text-xs text-gray-500">{launch.time}</p>
          <div className="w-full">
            <div className="flex justify-between items-center text-xs text-neon-green mb-1">
              <span>Medidor de Buzz</span>
              <span>{launch.buzz}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-neon-green h-2.5 rounded-full" style={{ width: `${launch.buzz}%` }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6">
        <button className="w-full bg-neon-green text-black font-bold py-3 px-4 rounded-lg transition-transform hover:scale-105">
            Got your own Memecoin? PumpUr$hitHere! 🚀
        </button>
    </div>
  </div>
);

const TopHunters = () => {
    const getPodiumClass = (rank: number) => {
        switch(rank) {
            case 1: return 'border-yellow-400 bg-yellow-400/10 hover:shadow-yellow-400/20';
            case 2: return 'border-gray-400 bg-gray-400/10 hover:shadow-gray-400/20';
            case 3: return 'border-orange-400 bg-orange-400/10 hover:shadow-orange-400/20';
            default: return 'border-[#30363D] hover:border-neon-green/50';
        }
    };
    
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">🏆 Top Cazadores</h2>
        <ul className="space-y-3">
          {topHunters.map(hunter => (
            <li key={hunter.rank} className={`bg-[#161B22] border-2 rounded-lg p-4 flex items-center justify-between transition-shadow shadow-md ${getPodiumClass(hunter.rank)}`}>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-400 w-8 text-center">{hunter.rank}</span>
                <img src={hunter.avatar} alt={hunter.username} className="w-12 h-12 rounded-full" />
                <span className="font-semibold text-white text-lg">{hunter.username}</span>
              </div>
              <div className="flex items-center space-x-2 text-neon-green font-bold">
                <Diamond size={18} />
                <span>{hunter.score.toLocaleString()} Puntos</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center p-4 bg-[#161B22] border border-dashed border-[#30363D] rounded-lg">
          <p className="text-gray-400">Want to see your name here? 🤔 Start posting, vote, and earn Fidelity points!</p>
        </div>
      </div>
    );
};


const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('Gemas Pulidas');
  const tabs = ['Gemas Pulidas', 'Lanzamientos en la Mira', 'Top Cazadores'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Gemas Pulidas':
        return <PolishedGems />;
      case 'Lanzamientos en la Mira':
        return <UpcomingLaunches />;
      case 'Top Cazadores':
        return <TopHunters />;
      default:
        return null;
    }
  };

  return (
    <section className="col-span-2 border-r border-gray-800 max-w-[800px] w-full mx-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
            <h1 className="text-xl font-bold">Radar</h1>
        </header>

        {/* Tab Navigation */}
        <div className="border-b border-gray-800">
            <nav className="flex space-x-4 px-4" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-4 text-sm font-medium transition-all duration-200
                          ${
                            activeTab === tab
                              ? 'border-b-4 border-electric-purple text-electric-purple font-bold'
                              : 'text-gray-300 border-b-4 border-transparent hover:text-electric-purple/80 hover:border-electric-purple/50'
                          }
                        `}
                        aria-current={activeTab === tab ? 'page' : undefined}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>

        {/* Content */}
        <div>
            {renderContent()}
        </div>
    </section>
  );
};

export default ExplorePage;