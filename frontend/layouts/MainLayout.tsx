
import React from 'react';
import SideNav from '../components/SideNav';
import TrendingPosts from '../components/TrendingPosts';

interface MainLayoutProps {
    children: React.ReactNode;
    showTrendingSidebar?: boolean;
    onConnectClick: () => void;
    onCreatePostClick: () => void;
    onOpenJoinCommunityModal: () => void;
}

const MainLayout = ({ children, showTrendingSidebar = true, onConnectClick, onCreatePostClick, onOpenJoinCommunityModal }: MainLayoutProps) => {
    return (
        <div className="flex w-full justify-center bg-[#0D1117]">
            <div className="flex w-full max-w-7xl">
                {/* 1. Sidebar Izquierda */}
                <header className="w-[275px] flex-shrink-0">
                    <div className="fixed top-1 h-full w-[275px] p-4">
                        <SideNav 
                            onConnectClick={onConnectClick}
                            onCreatePostClick={onCreatePostClick}
                            onOpenJoinCommunityModal={onOpenJoinCommunityModal}
                        />
                    </div>
                </header>

                {/* 2. Contenido Central */}
                <main className="flex-grow border-x border-gray-800 min-w-0">
                    {children}
                </main>
                
                {/* 3. Columna Derecha: Trending */}
                {showTrendingSidebar && (
                    <aside className="hidden lg:block w-[400px] flex-shrink-0 p-8">
                        <div className="sticky top-4">
                            <TrendingPosts />
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default MainLayout;