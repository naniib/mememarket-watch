import React from 'react';
import { Newspaper } from 'lucide-react';

// --- Datos de Ejemplo para los Artículos ---
const articles = [
    {
        slug: 'meme-coin-x-analisis',
        category: 'Análisis',
        date: 'Hace 2 días',
        title: 'MemeCoin X: ¿Próximo 1000x o Dump Asegurado?',
        summary: 'Profundizamos en los tokenomics, la comunidad y los posibles catalizadores de MemeCoin X. ¿Es la gema que todos esperan o una trampa para inversores desprevenidos? Nuestro análisis completo te da las claves.',
        author: 'MemeMarketWatch Oficial',
        imageUrl: 'https://images.unsplash.com/photo-1641427236357-ab17f7142104?q=80&w=800&auto=format&fit=crop',
        authorAvatar: 'https://i.imgur.com/7gM4M1k.png',
    },
    {
        slug: 'el-dilema-del-degen',
        category: 'Humor',
        date: 'Hace 5 días',
        title: 'El Dilema del Degen: 5 Señales de que Estás Demasiado Metido',
        summary: '¿Sueñas con velas verdes? ¿Tu comida favorita son los fideos instantáneos para poder comprar más $PEPE? Esta es la guía definitiva para saber si has cruzado la línea de inversor a degen a tiempo completo.',
        author: 'Dr. Degenstein',
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
        authorAvatar: 'https://i.pravatar.cc/150?u=degenstein',
    },
    {
        slug: 'guia-supervivencia-bear-market',
        category: 'Guía',
        date: 'Hace 1 semana',
        title: 'Guía de Supervivencia para el Bear Market de Memecoins',
        summary: 'El mercado está en rojo y el pánico se apodera de las calles (digitales). No temas, joven degen. Te traemos las mejores estrategias para sobrevivir, acumular y prepararte para el próximo bull run.',
        author: 'General Hold',
        imageUrl: 'https://images.unsplash.com/photo-1631603090989-93f9ef6911b3?q=80&w=800&auto=format&fit=crop',
        authorAvatar: 'https://i.pravatar.cc/150?u=generalhold',
    },
];


const MemePressPage = () => {
    return (
        <main className="w-full">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0D1117]/80 border-b border-gray-800 p-5">
                <h1 className="text-xl font-bold flex items-center">
                    <Newspaper className="mr-2" />
                    MemePress & Humor
                </h1>
            </header>
            
            <div className="p-5 flex justify-center">
                <div className="w-full max-w-4xl animate-fade-in">
                    {articles.map((article) => (
                        // ### CAMBIO PRINCIPAL AQUÍ: Añadimos borde y sombra de neón ###
                        <a 
                            key={article.slug} 
                            href={`#/memepress/${article.slug}`}
                            className="block bg-[#161B22] border border-emerald-400/30 rounded-xl p-6 mb-6 transition-all duration-300 hover:bg-[#1D2127] group neon-card"
                            style={{ 
                                boxShadow: '0 0 15px rgba(52, 211, 153, 0.20)',
                                // Descomenta la siguiente línea si quieres también el brillo interior
                                // boxShadow: '0 0 15px rgba(52, 211, 153, 0.25), inset 0 0 4px rgba(52, 211, 153, 0.4)'
                            }}
                        >
                            <img 
                                src={article.imageUrl} 
                                alt={article.title} 
                                className="h-48 w-full object-cover rounded-md mb-4"
                            />
                            
                            <div className="flex items-center space-x-4">
                                {/* ### CAMBIO 2: Etiqueta de categoría con el color oficial ### */}
                                <span className="bg-emerald-400/20 text-emerald-300 px-2 py-1 rounded text-xs font-semibold">{article.category}</span>
                                <span className="text-gray-400 text-sm">{article.date}</span>
                            </div>

                            {/* ### CAMBIO 3: Título con hover al color oficial ### */}
                            <h2 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-emerald-400 transition-colors">
                                {article.title}
                            </h2>

                            <p className="text-gray-400 text-base leading-relaxed">
                                {article.summary}
                            </p>

                            <div className="flex items-center mt-4 text-gray-400 text-sm">
                                <img src={article.authorAvatar} alt={article.author} className="w-8 h-8 rounded-full mr-2 object-cover" />
                                <span>Por <strong>{article.author}</strong></span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MemePressPage;