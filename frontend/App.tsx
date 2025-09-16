




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
import AuthModal from './components/AuthModal'; 
import JoinCommunityModal from './components/JoinCommunityModal';
import AccountRequiredModal from './components/AccountRequiredModal';
import PumpUrShitNowModal from './components/PumpUrShitNowModal';

interface User {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string;
}

// A router component to determine which page and layout to render
const renderPage = (path: string) => {
    // Routes with MainLayout
    if (path.startsWith('/profile/edit')) {
        return { Component: EditProfilePage, Layout: MainLayout };
    }
    if (path.startsWith('/profile/')) {
        return { Component: ProfilePage, Layout: MainLayout };
    }
    if (path === '/home') {
        return { Component: SocialHomePage, Layout: MainLayout };
    }
    // AQUÍ ESTÁ EL CAMBIO
    if (path === '/explore') {
        return { Component: ExplorePage, Layout: MainLayout };
    }
    if (path === '/battles') {
        return { Component: MemeBattlesPage, Layout: MainLayout };
    }
    if (path.startsWith('/memepress/')) {
        return { Component: ArticleDetailPage, Layout: MainLayout, layoutProps: { showTrendingSidebar: false } };
    }
    if (path === '/memepress') {
        return { Component: MemePressPage, Layout: MainLayout, layoutProps: { showTrendingSidebar: false } };
    }
    if (path === '/fidelity') {
        return { Component: FidelityPage, Layout: MainLayout };
    }

    // Routes with standard Header/Footer
    if (path.startsWith('/coin/')) {
        return { Component: CoinDetailPage, showHeaderFooter: true };
    }
    
    // Standalone routes (no layout, no header/footer)
    switch (path) {
        case '/login':
            return { Component: LoginPage, showHeaderFooter: false };
        case '/register':
            return { Component: RegisterPage, showHeaderFooter: false };
        case '/':
            return { Component: HomePage, showHeaderFooter: true };
        default:
            // Fallback to HomePage for any unknown route
            return { Component: HomePage, showHeaderFooter: true };
    }
};


const App = () => {
    const getPathFromHash = () => {
        let path = window.location.hash.substring(1);
        if (!path) return '/';
        if (!path.startsWith('/')) path = '/' + path;
        return path.split('?')[0];
    };
    
    const [path, setPath] = useState(getPathFromHash());
    const [user, setUser] = useState<User | null>(null);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showAccountRequiredModal, setShowAccountRequiredModal] = useState(false);
    const [isPumpModalOpen, setIsPumpModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<string | null>(null);

    useEffect(() => {
        // Centralized user state initialization
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.clear(); // Clear corrupted data
            }
        }

        const onLocationChange = () => setPath(getPathFromHash());
        window.addEventListener('hashchange', onLocationChange);
        onLocationChange();
        return () => window.removeEventListener('hashchange', onLocationChange);
    }, []);

    const handleLoginSuccess = (loggedInUser: User, token: string) => {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);
        setUser(loggedInUser);
        setShowAuthModal(false);
        
        if (pendingAction === 'pump-shit-now') {
            setIsPumpModalOpen(true);
            setPendingAction(null); // Reset
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleOpenAuthModal = () => {
        setShowJoinModal(false);
        setShowAccountRequiredModal(false);
        setShowAuthModal(true);
    };

    const handleOpenAccountRequiredModal = () => {
        setShowAccountRequiredModal(true);
    };

    const { Component, Layout, showHeaderFooter, layoutProps } = renderPage(path);
    
    const componentProps = {
        user: user,
        onOpenJoinCommunityModal: () => setShowJoinModal(true),
        onOpenAccountRequiredModal: handleOpenAccountRequiredModal,
        onOpenAuthModal: handleOpenAuthModal,
        onOpenPumpModal: () => setIsPumpModalOpen(true),
    };

    if (Layout) {
        return (
            <>
                <Layout 
                    {...layoutProps}
                    user={user}
                    onLogout={handleLogout}
                    onConnectClick={() => setShowAuthModal(true)}
                    onCreatePostClick={() => setShowJoinModal(true)}
                >
                    <Component {...componentProps} />
                </Layout>
                {isPumpModalOpen && 
                    <PumpUrShitNowModal 
                        onClose={() => setIsPumpModalOpen(false)} 
                        user={user}
                        onOpenAccountRequiredModal={handleOpenAccountRequiredModal}
                        onOpenAuthModal={handleOpenAuthModal}
                        onSetPendingAction={() => setPendingAction('pump-shit-now')}
                    />
                }
                {showJoinModal && <JoinCommunityModal onClose={() => setShowJoinModal(false)} onConnect={handleOpenAuthModal} />}
                {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLoginSuccess={handleLoginSuccess} />}
                {showAccountRequiredModal && <AccountRequiredModal onClose={() => setShowAccountRequiredModal(false)} onOpenAuthModal={handleOpenAuthModal} />}
            </>
        );
    }

    const mainClass = 'flex-grow overflow-y-auto';

    return (
        <>
            <div className="min-h-screen flex flex-col">
                {showHeaderFooter && <Header user={user} onLogout={handleLogout} onLoginClick={() => setShowAuthModal(true)} />}
                <main className={mainClass}>
                    <Component {...componentProps} />
                </main>
                {showHeaderFooter && <Footer />}
            </div>
            {isPumpModalOpen && 
                <PumpUrShitNowModal 
                    onClose={() => setIsPumpModalOpen(false)} 
                    user={user}
                    onOpenAccountRequiredModal={handleOpenAccountRequiredModal}
                    onOpenAuthModal={handleOpenAuthModal}
                    onSetPendingAction={() => setPendingAction('pump-shit-now')}
                />
            }
            {showJoinModal && <JoinCommunityModal onClose={() => setShowJoinModal(false)} onConnect={handleOpenAuthModal} />}
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLoginSuccess={handleLoginSuccess} />}
            {showAccountRequiredModal && <AccountRequiredModal onClose={() => setShowAccountRequiredModal(false)} onOpenAuthModal={handleOpenAuthModal} />}
        </>
    );
};

export default App;