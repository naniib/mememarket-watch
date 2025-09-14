import React from 'react';

const Logo = () => (
    <img src="logo4.png" alt="MemeMarket Logo" className="w-8 h-8" />
);

const XIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const TelegramIcon = () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.1l15.97-6.16c.73-.28 1.4.24 1.15.99L18.23 18.5c-.27.8-.82 1-1.5.61l-4.1-3.25-1.87 1.8c-.24.24-.45.46-.8.46z" /></svg>;
const RedditIcon = () => <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.15,2.15a8,8,0,0,0-8,8,7.98,7.98,0,0,0,5.88,7.72.61.61,0,0,0,.64-.53.72.72,0,0,0,0-.31V15.15a.51.51,0,0,1,.33-.48,5.43,5.43,0,0,0,1.38-.47,3.22,3.22,0,0,0,1.06-.82,1.83,1.83,0,0,0,.35-1.11,2.44,2.44,0,0,0-.49-1.59.83.83,0,0,1-.13-.71,3.47,3.47,0,0,0,0-1.78.69.69,0,0,1,.17-.5,1.28,1.28,0,0,1,.73-.42h.16a.43.43,0,0,1,.39.29,6.58,6.58,0,0,1,1,2.82,6.43,6.43,0,0,1,1.13-2.82.41.41,0,0,1,.39-.29h.16a1.28,1.28,0,0,1,.73.42.69.69,0,0,1,.17.5,3.47,3.47,0,0,0,0,1.78.83.83,0,0,1-.13-.71,2.44,2.44,0,0,0-.49,1.59,1.83,1.83,0,0,0,.35,1.11,3.22,3.22,0,0,0,1.06.82,5.43,5.43,0,0,0,1.38.47.51.51,0,0,1,.33.48v1.88a.72.72,0,0,0,0,.31.61.61,0,0,0,.64.53A7.98,7.98,0,0,0,18.15,10.15a8,8,0,0,0-8-8Z"></path><path d="M12.24,12.63a1.44,1.44,0,0,0,1.44-1.44,1.43,1.43,0,0,0-2.86,0,1.44,1.44,0,0,0,1.42,1.44Z"></path><path d="M7.76,12.63a1.44,1.44,0,0,0,1.44-1.44,1.43,1.43,0,0,0-2.86,0,1.44,1.44,0,0,0,1.42,1.44Z"></path><path d="M14.28,14.08a.51.51,0,0,0-.68.18,3.29,3.29,0,0,1-2.9,1.61,3.31,3.31,0,0,1-3.14-2.2.51.51,0,0,0-1,0,4.31,4.31,0,0,0,4.1,2.85,4.28,4.28,0,0,0,3.8-2.14.51.51,0,0,0-.18-.68Z"></path></svg>;

const Footer = () => (
    <footer className="bg-black border-t border-gray-900">
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <Logo />
                    <span className="text-xl font-bold text-white">MemeMarket</span>
                    <span className="text-xs font-mono bg-gray-800 text-[#00f5b3] px-2 py-0.5 rounded">WATCH</span>
                </div>
                <nav className="flex items-center space-x-6 text-sm text-gray-400 mb-4 md:mb-0">
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-[#00f5b3] transition-colors"><XIcon /></a>
                    <a href="#" className="text-gray-400 hover:text-[#00f5b3] transition-colors"><TelegramIcon /></a>
                    <a href="#" className="text-gray-400 hover:text-[#00f5b3] transition-colors"><RedditIcon /></a>
                </div>
            </div>
            <div className="text-center text-xs text-gray-600 mt-6 border-t border-gray-900 pt-4">
                © {new Date().getFullYear()} MemeMarket Watch. All rights reserved. Data provided is for informational purposes only.
            </div>
        </div>
    </footer>
);

export default Footer;