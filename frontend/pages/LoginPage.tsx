

import React, { useState } from 'react';
import { login } from '../api';
import { Mail, Lock, LogIn } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black p-4">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:4s]"></div>
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

        // FIX: Corrected syntax for the catch block by removing the erroneous arrow function syntax.
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthLayout>
            <div className="bg-[#10141a]/80 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 space-y-6 animate-fade-in shadow-2xl shadow-cyan-500/20">
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-cyan-400" style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.9)' }}>Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your account</p>
                </header>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg text-sm text-center" role="alert">{error}</p>}
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-gray-500 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-gray-500 transition-colors" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                       {loading ? 'Signing In...' : <><LogIn className="mr-2" /> Sign In</>}
                    </button>
                </form>
                 <p className="text-center text-gray-400 text-sm">
                    Don't have an account? <a href="#/register" className="font-bold text-cyan-400">Register here</a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;