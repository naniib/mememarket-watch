import React from 'react';

interface ProfileNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileNavTabs = ({ activeTab, onTabChange }: ProfileNavTabsProps) => {
  const tabs = ['Posts', 'Replies', 'Media', 'Likes', 'Notifications', 'Settings', 'Followers'];

  return (
    <div className="border-b border-gray-800">
      <nav className="flex space-x-4 overflow-x-auto px-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-3 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200
              ${
                activeTab === tab
                  ? 'border-b-4 border-neon-blue text-neon-blue font-bold'
                  : 'text-gray-300 border-b-4 border-transparent hover:text-neon-blue/80 hover:border-neon-blue/50'
              }
            `}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileNavTabs;
