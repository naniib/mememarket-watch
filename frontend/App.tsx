

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoinDetailPage from './pages/CoinDetailPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SocialHomePage from './pages/SocialHomePage';
import MainLayout from './layouts/MainLayout';
import ExplorePage from './pages/ExplorePage'; 
import MemeBattlesPage from './pages/MemeBattlesPage';
import MemePressPage from './pages/MemePressPage'; 
import ArticleDetailPage from './pages/ArticleDetailPage'; 
import FidelityPage from './pages/FidelityPage';
import TrendingPage from './pages/TrendingPage'; // Importar la nueva página
import AuthModal from './components/AuthModal';
import JoinCommunityModal from './components/JoinCommunityModal';
import PumpUrShitNowModal from './components/PumpUrShitNowModal';
import AccountRequiredModal from './components/AccountRequiredModal';

interface User {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string;
}

const App = () => {
    const getPathFromHash = () => {
        let path = window.location.hash.substring(1);
        if (!path) return '/';
        if (!path.startsWith('/')) path = '/' + path;
        return path.split('?')[0];
    };
    
    const [path, setPath] = useState(getPathFromHash());
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isJoinCommunityModalOpen, setJoinCommunityModalOpen] = useState(false);
    const [isPumpModalOpen, setPumpModalOpen] = useState(false);
    const [isAccountRequiredModalOpen, setAccountRequiredModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.clear();
            }
        }

        const onLocationChange = () => setPath(getPathFromHash());
        window.addEventListener('hashchange', onLocationChange);
        onLocationChange();
        return () => window.removeEventListener('hashchange', onLocationChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        window.location.hash = '#/';
    };

    const handleLoginSuccess = (loggedInUser: User, token: string) => {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);
        setUser(loggedInUser);
        closeAllModals();

        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        } else if (window.location.hash.includes('/login') || window.location.hash.includes('/register')) {
            window.location.hash = '#/home';
        }
    };

    const handleConnectClick = () => {
        closeAllModals();
        setAuthModalOpen(true);
    };

    const handleCreatePostClick = () => {
        if (!user) {
            setJoinCommunityModalOpen(true);
        } else {
            // Placeholder for create post modal or action
            alert('Create post functionality will be implemented here.');
        }
    };

    const handleOpenPumpModal = () => {
        closeAllModals();
        setPumpModalOpen(true);
    };
    
    const handleSetPendingPumpAction = () => {
        setPendingAction(() => () => {
             // We need a slight delay to ensure the auth modal is closed
            setTimeout(() => setPumpModalOpen(true), 100);
        });
    };

    const closeAllModals = () => {
        setAuthModalOpen(false);
        setJoinCommunityModalOpen(false);
        setPumpModalOpen(false);
        setAccountRequiredModalOpen(false);
    };

    const renderPage = () => {
        let LayoutComponent: React.ElementType | null = null;
        let PageComponent: React.ElementType | null = null;
        let showHeaderFooter = false;
        let layoutProps: any = {};

        // MainLayout Routes
        const mainLayoutRoutes: Record<string, { component: React.ElementType, props?: any }> = {
            '/home': { component: SocialHomePage, props: { showTrendingSidebar: true } },
            '/explore': { component: ExplorePage, props: { showTrendingSidebar: true } },
            '/battles': { component: MemeBattlesPage, props: { user, onOpenJoinCommunityModal: () => setJoinCommunityModalOpen(true) } },
            '/memepress': { component: MemePressPage, props: { showTrendingSidebar: false } },
            '/fidelity': { component: FidelityPage },
            '/trending': { component: TrendingPage, props: { showTrendingSidebar: true } }, // Añadir ruta de Trending
        };

        // FIX: Add useStandardHeader to the type to resolve TypeScript errors.
        const pathPrefixes: Record<string, { component: React.ElementType, props?: any, useStandardHeader?: boolean }> = {
            '/profile/edit': { component: EditProfilePage },
            '/profile/': { component: ProfilePage },
            '/memepress/': { component: ArticleDetailPage, props: { showTrendingSidebar: false } },
            '/coin/': { component: CoinDetailPage, useStandardHeader: true },
        };

        let found = false;
        for (const prefix in pathPrefixes) {
            if (path.startsWith(prefix)) {
                PageComponent = pathPrefixes[prefix].component;
                if (pathPrefixes[prefix].useStandardHeader) {
                    showHeaderFooter = true;
                } else {
                    LayoutComponent = MainLayout;
                    layoutProps = pathPrefixes[prefix].props || {};
                }
                found = true;
                break;
            }
        }
        
        if (!found && mainLayoutRoutes[path]) {
            PageComponent = mainLayoutRoutes[path].component;
            LayoutComponent = MainLayout;
            layoutProps = mainLayoutRoutes[path].props || {};
            found = true;
        }

        // Standalone Routes
        if (!found) {
            switch (path) {
                case '/login':
                    PageComponent = LoginPage;
                    break;
                case '/register':
                    PageComponent = RegisterPage;
                    break;
                case '/':
                    PageComponent = HomePage;
                    showHeaderFooter = true;
                    break;
                default:
                    // Fallback for any unknown route
                    PageComponent = () => <div className="text-center p-10">404 - Page Not Found</div>;
                    showHeaderFooter = true;
            }
        }
        
        if (LayoutComponent) {
            return (
                <LayoutComponent 
                    user={user} 
                    onLogout={handleLogout} 
                    onConnectClick={handleConnectClick}
                    onCreatePostClick={handleCreatePostClick}
                    {...layoutProps}
                >
                    <PageComponent />
                </LayoutComponent>
            );
        }

        if (showHeaderFooter) {
            return (
                <>
                    <Header user={user} onLogout={handleLogout} onLoginClick={() => setAuthModalOpen(true)} />
                    <PageComponent onOpenPumpModal={handleOpenPumpModal}/>
                    <Footer />
                </>
            );
        }

        return <PageComponent />;
    };

    return (
        <>
            {renderPage()}
            {isAuthModalOpen && <AuthModal onClose={closeAllModals} onLoginSuccess={handleLoginSuccess} />}
            {isJoinCommunityModalOpen && <JoinCommunityModal onClose={closeAllModals} onConnect={handleConnectClick} />}
            {isPumpModalOpen && (
                <PumpUrShitNowModal 
                    user={user}
                    onClose={closeAllModals} 
                    onOpenAccountRequiredModal={() => setAccountRequiredModalOpen(true)}
                    onOpenAuthModal={handleConnectClick}
                    onSetPendingAction={handleSetPendingPumpAction}
                />
            )}
            {isAccountRequiredModalOpen && (
                <AccountRequiredModal 
                    onClose={closeAllModals} 
                    onOpenAuthModal={() => {
                        closeAllModals();
                        handleConnectClick();
                    }} 
                />
            )}
        </>
    );
};

export default App;