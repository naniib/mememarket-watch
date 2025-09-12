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
import ExplorePage from './pages/ExplorePage'; // <-- AÑADIDO
import MemeBattlesPage from './pages/MemeBattlesPage';
import MemePressPage from './pages/MemePressPage'; // <-- AÑADIDO
import ArticleDetailPage from './pages/ArticleDetailPage'; // <-- AÑADIDO
import FidelityPage from './pages/FidelityPage';

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
    // Helper to get a clean path from the URL hash, defaulting to '/'
    const getPathFromHash = () => {
        let path = window.location.hash.substring(1);
        
        if (!path) {
            return '/'; // Default to root if hash is empty or just '#'
        }

        // Ensure path starts with a '/' for consistency
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        
        // Ignore query parameters for routing
        return path.split('?')[0];
    };
    
    const [path, setPath] = useState(getPathFromHash());

    useEffect(() => {
        const onLocationChange = () => {
            setPath(getPathFromHash());
        };

        // Listen for hash changes to handle navigation
        window.addEventListener('hashchange', onLocationChange);
        
        // Set initial path on component mount
        onLocationChange();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', onLocationChange);
        };
    }, []);

    const { Component, Layout, showHeaderFooter, layoutProps } = renderPage(path);

    if (Layout) {
        return (
// FIX: Property 'children' is missing in type '{ showTrendingSidebar: boolean; }' but required in type 'MainLayoutProps'.
// The children prop is passed implicitly by JSX. Making it optional in the component's props interface will fix this kind of TS error.
            <Layout {...layoutProps}>
                <Component />
            </Layout>
        );
    }

    const mainClass = 'flex-grow overflow-y-auto';

    return (
        <div className="min-h-screen flex flex-col bg-[#0D1117] text-gray-300">
            {showHeaderFooter && <Header />}
            <main className={mainClass}>
                <Component />
            </main>
            {showHeaderFooter && <Footer />}
        </div>
    );
};

export default App;