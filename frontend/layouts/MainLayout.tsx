import React from 'react';
import SideNav from '../components/SideNav';
import TrendingPosts from '../components/TrendingPosts';

interface User {
    id: number;
    username: string;
    avatarUrl?: string;
}

interface MainLayoutProps {
    children: React.ReactNode;
    showTrendingSidebar?: boolean;
    user: User | null;
    onLogout: () => void;
    onConnectClick: () => void;
    onCreatePostClick: () => void;
}

const MainLayout = ({ children, showTrendingSidebar = true, user, onLogout, onConnectClick, onCreatePostClick }: MainLayoutProps) => {
    return (
        <div className="flex w-full justify-center">
            <div className="flex w-full max-w-9xl">
                {/* 1. Sidebar Izquierda */}
                <header className="w-[275px] flex-shrink-0">
                    <div className="fixed top-1 h-full w-[275px] border-r border-gray-800 p-4">
                        <SideNav 
                            user={user} 
                            onLogout={onLogout}
                            onConnectClick={onConnectClick}
                            onCreatePostClick={onCreatePostClick}
                        />
                    </div>
                </header>

                {/* 2. Contenido Central */}
                <main className="w-full">
                    {children}
                </main>
                
                {/* 3. Columna Derecha: Trending */}
                {showTrendingSidebar && (
                    <aside className="hidden lg:block p-8">
                        <div className="sticky top-4 w-[400px]">
                            <TrendingPosts />
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default MainLayout;