


import React, { useState } from 'react';
import { login } from '../api';

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
);
const PasswordIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const SignInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" /></svg>
);

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black p-4">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:4s]"></div>
        <div className="relative z-10 w-full max-w-sm">
            {children}
        </div>
    </div>
);

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login({ email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.history.back();

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthLayout>
            <div className="bg-black/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 space-y-6 animate-fade-in">
                <header className="space-y-2 text-center">
                    <a href="#/" className="inline-block text-2xl font-bold mb-2 text-gray-500 hover:text-white" aria-label="Back to home">&larr;</a>
                    <h1 className="text-3xl font-bold text-[#00f5b3]" style={{ textShadow: '0 0 8px rgba(0, 245, 179, 0.7)' }}>Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your account</p>
                    <div className="flex justify-center space-x-3 pt-4">
                        <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center text-xl shadow-lg">🚀</div>
                        <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center text-xl shadow-lg">💎</div>
                        <div className="w-10 h-10 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center text-xl shadow-lg">🌙</div>
                    </div>
                </header>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg text-sm text-center" role="alert">{error}</p>}
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><EmailIcon /></span>
                            <input 
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f5b3] text-white" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><PasswordIcon /></span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00f5b3] text-white" />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-[#00f5b3] text-black font-bold py-3 px-4 rounded-lg transition-all hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,245,179,0.5)]">
                       {loading ? 'Signing In...' : <><SignInIcon /> Sign In</>}
                    </button>
                </form>
                 <p className="text-center text-gray-400 text-sm">
                    Don't have an account? <a href="#/register" className="font-medium text-[#00f5b3] hover:underline">Register here</a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;