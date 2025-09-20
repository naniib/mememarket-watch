
import React from 'react';

interface TrendingTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TrendingTabs = ({ activeTab, onTabChange }: TrendingTabsProps) => {
    const tabs = ['Trending Posts', 'Trending Topics', 'Trending Users'];

    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-2 flex items-center justify-center space-x-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-6 py-2 text-sm font-bold rounded-lg transition-all duration-200 w-full
                        ${activeTab === tab
                            ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/30'
                            : 'text-gray-400 hover:bg-gray-800'
                        }
                    `}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TrendingTabs;