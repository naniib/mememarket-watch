

import React, { useState } from 'react';
import { login, register } from '../api';
import { X, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
    onClose: () => void;
    onLoginSuccess: (user: any, token: string) => void;
}

const AuthModal = ({ onClose, onLoginSuccess }: AuthModalProps) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let data;
            if (isLoginView) {
                data = await login({ email, password });
            } else {
                if (username.length < 3) throw new Error("Username must be at least 3 characters.");
                if (password.length < 6) throw new Error("Password must be at least 6 characters.");
                data = await register({ username, email, password });
            }
            onLoginSuccess(data.user, data.token);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
        >
            <div 
                className="relative w-full max-w-sm bg-gradient-to-br from-[#10141a] to-[#0D1117] border border-neon-blue/30 rounded-2xl shadow-2xl shadow-neon-blue/20"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 flex justify-end">
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X /></button>
                </header>

                <div className="p-8 pt-0">
                    <h1 id="auth-modal-title" className="text-3xl font-bold text-center mb-2 text-neon-blue" style={{ textShadow: '0 0 15px rgba(0, 229, 255, 0.9)' }}>
                        {isLoginView ? 'Welcome Back' : 'Join the Revolution'}
                    </h1>
                    <p className="text-gray-400 text-center mb-6">
                        {isLoginView ? 'Sign in to your account' : 'Create your account'}
                    </p>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg text-sm text-center">{error}</p>}
                        
                        {!isLoginView && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white placeholder:text-gray-500 transition-colors" />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white placeholder:text-gray-500 transition-colors" />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue text-white placeholder:text-gray-500 transition-colors" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center bg-neon-blue text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (
                                isLoginView ? <><LogIn className="mr-2" /> Sign In</> : <><UserPlus className="mr-2" /> Create Account</>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-300 text-sm mt-6">
                        {isLoginView ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-bold text-neon-blue">
                            {isLoginView ? "Register here" : "Sign in here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;