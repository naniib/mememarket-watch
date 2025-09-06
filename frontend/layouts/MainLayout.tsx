import React from 'react';
import SideNav from '../components/SideNav';
import TrendingPosts from '../components/TrendingPosts';

interface MainLayoutProps {
    children: React.ReactNode;
    showTrendingSidebar?: boolean;
}

const MainLayout = ({ children, showTrendingSidebar = true }: MainLayoutProps) => {
    return (
        <div className="flex w-full justify-center bg-[#0D1117] text-white">
            <div className="flex w-full max-w-9xl">
                {/* 1. Sidebar Izquierda (Tus dimensiones respetadas) */}
                <header className="w-[275px] flex-shrink-0">
                    <div className="fixed top-1 h-full w-[275px] border-r border-gray-800 p-4">
                        <SideNav />
                    </div>
                </header>

                {/* 2. Contenido Central (La página actual que se renderiza aquí) */}
                <main className="w-full px-6">
                    {children}
                </main>
                
                {/* 3. Columna Derecha: Trending (AHORA CONDICIONAL) */}
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