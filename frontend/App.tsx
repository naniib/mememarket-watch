
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
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
import TrendingPage from './pages/TrendingPage';
import AuthModal from './components/AuthModal';
import JoinCommunityModal from './components/JoinCommunityModal';
import PumpUrShitNowModal from './components/PumpUrShitNowModal';
import AccountRequiredModal from './components/AccountRequiredModal';

// --- START: Auth Context Logic ---
interface User {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.clear();
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback((loggedInUser: User, token: string) => {
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', token);
        setUser(loggedInUser);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const isAuthenticated = !!user;

    const value = { user, login, logout, isAuthenticated, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
// --- END: Auth Context Logic ---

const AppContent = () => {
    const getPathFromHash = () => {
        let path = window.location.hash.substring(1);
        if (!path) return '/';
        if (!path.startsWith('/')) path = '/' + path;
        return path.split('?')[0];
    };
    
    const [path, setPath] = useState(getPathFromHash());
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isJoinCommunityModalOpen, setJoinCommunityModalOpen] = useState(false);
    const [isPumpModalOpen, setPumpModalOpen] = useState(false);
    const [isAccountRequiredModalOpen, setAccountRequiredModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
    
    const { user, login } = useAuth();

    useEffect(() => {
        const onLocationChange = () => setPath(getPathFromHash());
        window.addEventListener('hashchange', onLocationChange);
        onLocationChange();
        return () => window.removeEventListener('hashchange', onLocationChange);
    }, []);

    const handleLoginSuccess = (loggedInUser: any, token: string) => {
        login(loggedInUser, token);
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
            handleConnectClick();
        } else {
            window.location.hash = '#/home';
        }
    };

    const handleOpenJoinCommunityModal = () => {
        closeAllModals();
        setJoinCommunityModalOpen(true);
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
        let pageProps: any = {};

        const mainLayoutRoutes: Record<string, { component: React.ElementType, props?: any }> = {
            '/home': { component: SocialHomePage, props: { showTrendingSidebar: true } },
            '/explore': { component: ExplorePage, props: { showTrendingSidebar: true } },
            '/battles': { component: MemeBattlesPage, props: { user, onOpenJoinCommunityModal: handleOpenJoinCommunityModal } },
            '/memepress': { component: MemePressPage, props: { showTrendingSidebar: false } },
            '/fidelity': { component: FidelityPage },
            '/trending': { component: TrendingPage, props: { showTrendingSidebar: true } },
        };

        const pathPrefixes: Record<string, { component: React.ElementType, props?: any, useStandardHeader?: boolean }> = {
            '/profile/edit': { component: EditProfilePage },
            '/profile/': { component: ProfilePage },
            '/memepress/': { component: ArticleDetailPage, props: { showTrendingSidebar: false } },
            '/coin/': { component: CoinDetailPage, useStandardHeader: true, props: { onLoginClick: handleConnectClick } },
        };

        let found = false;
        for (const prefix in pathPrefixes) {
            if (path.startsWith(prefix)) {
                PageComponent = pathPrefixes[prefix].component;
                pageProps = { ...pageProps, ...(pathPrefixes[prefix].props || {}) };
                if (pathPrefixes[prefix].useStandardHeader) {
                    showHeaderFooter = true;
                } else {
                    LayoutComponent = MainLayout;
                    layoutProps = { 
                        ...pathPrefixes[prefix].props, 
                        onConnectClick: handleConnectClick,
                        onCreatePostClick: handleCreatePostClick,
                        onOpenJoinCommunityModal: handleOpenJoinCommunityModal,
                    };
                }
                found = true;
                break;
            }
        }
        
        if (!found && mainLayoutRoutes[path]) {
            PageComponent = mainLayoutRoutes[path].component;
            LayoutComponent = MainLayout;
            layoutProps = {
                 ...mainLayoutRoutes[path].props,
                 onConnectClick: handleConnectClick,
                 onCreatePostClick: handleCreatePostClick,
                 onOpenJoinCommunityModal: handleOpenJoinCommunityModal,
            };
            found = true;
        }

        if (!found) {
            switch (path) {
                case '/login':
                    PageComponent = LoginPage;
                    pageProps = { onLoginSuccess: handleLoginSuccess };
                    break;
                case '/register':
                    PageComponent = RegisterPage;
                    pageProps = { onLoginSuccess: handleLoginSuccess };
                    break;
                case '/':
                    PageComponent = HomePage;
                    pageProps = { onOpenPumpModal: handleOpenPumpModal };
                    showHeaderFooter = true;
                    break;
                default:
                    PageComponent = () => <div className="text-center p-10">404 - Page Not Found</div>;
                    showHeaderFooter = true;
            }
        }
        
        if (LayoutComponent) {
            return (
                <LayoutComponent {...layoutProps}>
                    <PageComponent {...pageProps} />
                </LayoutComponent>
            );
        }

        if (showHeaderFooter) {
            return (
                <>
                    <Header onLoginClick={() => setAuthModalOpen(true)} />
                    <PageComponent {...pageProps}/>
                    <Footer />
                </>
            );
        }

        return <PageComponent {...pageProps}/>;
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


const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;