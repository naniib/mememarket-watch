import React, { useState } from 'react';

const FeedFilter = () => {
    const [activeTab, setActiveTab] = useState('Explore');

    const renderTab = (tabName: string) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className="relative flex-1 py-4 text-center font-bold transition-colors duration-200 hover:bg-[#161B22]/50"
                aria-pressed={isActive}
            >
                <span className={isActive ? 'text-white' : 'text-gray-500'}>
                    {tabName}
                </span>
                {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-cyan-400 rounded-full"></div>
                )}
            </button>
        );
    };

    return (
        <div className="flex border-b border-[#30363D]">
            {renderTab('Explore')}
            {renderTab('Following')}
        </div>
    );
};

export default FeedFilter;
