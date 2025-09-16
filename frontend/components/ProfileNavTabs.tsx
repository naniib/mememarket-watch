import React from 'react';

interface ProfileNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileNavTabs = ({ activeTab, onTabChange }: ProfileNavTabsProps) => {
  const tabs = ['Posts', 'Replies', 'Media', 'Likes', 'Notifications', 'Settings', 'Followers'];

  return (
    <div className="border-b border-gray-800">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative px-3 py-4 text-sm font-medium transition-colors duration-200
              ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-500 hover:text-white'
              }
            `}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-neon-green rounded-full"></span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileNavTabs;
