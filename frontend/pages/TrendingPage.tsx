
import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import TrendingTabs from '../components/TrendingTabs';
import TrendingPostsList from '../components/TrendingPostsList';
import TrendingTopicsList from '../components/TrendingTopicsList';
import TrendingUsersList from '../components/TrendingUsersList';

const TrendingPage = () => {
    const [activeTab, setActiveTab] = useState('Trending Posts');

    const renderContent = () => {
        switch (activeTab) {
            case 'Trending Posts':
                return <TrendingPostsList />;
            case 'Trending Topics':
                return <TrendingTopicsList />;
            case 'Trending Users':
                return <TrendingUsersList />;
            default:
                return null;
        }
    };

    return (
        <section className="w-full">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
                <h1 className="text-xl font-bold flex items-center text-emerald-400">
                    <BarChart2 className="mr-2" />
                    What's Happening
                </h1>
            </header>
            
            <div className="p-4 border-b border-gray-800">
                <TrendingTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="animate-fade-in">
                {renderContent()}
            </div>
        </section>
    );
};

export default TrendingPage;