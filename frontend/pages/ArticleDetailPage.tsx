import React from 'react';
import { ArrowLeft, Heart, MessageCircle, Upload } from 'lucide-react';
import TrendingPosts from '../components/TrendingPosts'; // Import the component

const ArticleDetailPage = () => {
    // Example comment data
    const comments = [
        {
            author: 'CryptoDegen',
            avatar: 'https://i.pravatar.cc/150?u=degen',
            text: 'Gran análisis. La verdad es que los dog-tokens han estado muy tranquilos últimamente, ¿será el fin de una era?',
            time: 'hace 5 min',
        },
        {
            author: 'Vitalik',
            avatar: 'https://i.pravatar.cc/150?u=vitalik',
            text: 'Interesante perspectiva. Sin embargo, la resiliencia de la comunidad no debe subestimarse.',
            time: 'hace 1 hora',
        },
    ];

    const recentNews = [
        { title: 'El Dilema del Degen: 5 Señales de que Estás Demasiado Metido', href: '#' },
        { title: 'Guía de Supervivencia para el Bear Market de Memecoins', href: '#' },
        { title: 'MemeCoin X: ¿Próximo 1000x o Dump Asegurado?', href: '#' },
        { title: 'Cómo detectar un Rug Pull antes de que sea tarde', href: '#' },
    ];


    return (
        <main className="w-full py-5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                {/* --- COLUMNA IZQUIERDA: CONTENIDO DEL ARTÍCULO --- */}
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <a href="#/memepress" className="flex items-center space-x-2 text-neon-green hover:opacity-80 transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver a MemePress & Humor</span>
                        </a>
                    </div>

                    <article className="bg-[#161B22] border border-[#30363D] rounded-xl p-8 animate-fade-in space-y-6">
                        {/* Título y Meta-información */}
                        <header>
                            <h1 className="text-4xl font-bold text-white leading-tight">
                                Análisis Semanal: ¿Están los Dog-tokens perdiendo su ladrido?
                            </h1>
                            <p className="text-gray-400 mt-4">
                                Por <strong>MemeMarketWatch Oficial</strong> • Publicado hace 2 horas
                            </p>
                        </header>

                        {/* Imagen Destacada */}
                        <img
                            src="https://images.unsplash.com/photo-1639843885448-a0c7c5b8b3a4?q=80&w=1200&auto=format&fit=crop"
                            alt="Dog tokens"
                            className="w-full h-80 object-cover rounded-lg"
                        />

                        {/* Cuerpo del Artículo */}
                        <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
                            </p>
                            <p>
                                Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, vel tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec vel felis et ante accumsan GME.
                            </p>
                        </div>
                        
                        {/* Barra de Acciones y Comentarios */}
                        <div className="border-t border-gray-700 pt-6 space-y-6">
                             {/* Barra de Acciones */}
                            <div className="flex items-center justify-between text-gray-400 max-w-sm">
                                <button className="flex items-center space-x-2 hover:text-pink-400">
                                    <Heart size={20} />
                                    <span>2.1K Me Gusta</span>
                                </button>
                                <button className="flex items-center space-x-2 hover:text-neon-green">
                                    <MessageCircle size={20} />
                                    <span>345 Comentarios</span>
                                </button>
                                <button className="flex items-center space-x-2 hover:text-green-400">
                                    <Upload size={20} />
                                    <span>Compartir</span>
                                </button>
                            </div>

                            {/* Sección de Comentarios */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white">Comentarios</h3>
                                {/* Formulario para nuevo comentario */}
                                <div className="flex space-x-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <textarea
                                        placeholder="Escribe tu comentario..."
                                        className="w-full bg-[#0D1117] border border-[#30363D] rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-neon-green text-sm"
                                        rows={3}
                                    />
                                </div>
                                {/* Lista de comentarios de ejemplo */}
                                <ul className="space-y-4">
                                    {comments.map((comment, index) => (
                                        <li key={index} className="flex space-x-3">
                                            <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full flex-shrink-0" />
                                            <div className="bg-gray-800/50 p-3 rounded-lg flex-1">
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <span className="font-bold text-white">{comment.author}</span>
                                                    <span className="text-gray-500">· {comment.time}</span>
                                                </div>
                                                <p className="text-gray-300 mt-1">{comment.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>

                {/* --- COLUMNA DERECHA: BARRA LATERAL --- */}
                <aside className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                     {/* Sección "Noticias Recientes" */}
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4">
                        <h3 className="text-lg font-bold text-white mb-4">Noticias Recientes</h3>
                        <ul className="space-y-3">
                            {recentNews.map((news, index) => (
                                <li key={index}>
                                    <a href={news.href} className="text-gray-300 hover:text-neon-green transition-colors text-base font-semibold">
                                        {news.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sección "Trending Posts" */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 px-4">Trending Posts</h3>
                        {/* Reutilización del componente TrendingPosts */}
                        <TrendingPosts />
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default ArticleDetailPage;