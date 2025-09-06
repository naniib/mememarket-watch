
export interface Coin {
    id: string;
    rank: number;
    name: string;
    ticker: string;
    price: number;
    priceChange: number;
    volume: string;
    marketCap: string;
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
    logo: string;
    icon: 'rocket' | 'fire' | 'lightning' | 'diamond' | 'snowflake' | 'bear' | 'wolf';
    stats: {
        likes: string;
        dislikes: string;
    };
}

// Data for MEMEHOT
export const hotCoins: Coin[] = [
    { id: 'doge2moon', rank: 1, name: 'Doge2Moon', ticker: 'DOGE2', price: 0.001234, priceChange: 156.7, volume: '$2.4M', marketCap: '$45.6M', risk: 'MEDIUM', logo: 'https://i.imgur.com/AM6M2Gj.png', icon: 'rocket', stats: { likes: '1247', dislikes: '89' } },
    { id: 'pepe3', rank: 2, name: 'Pepe3.0', ticker: 'PEPE3', price: 0.000089, priceChange: 89.2, volume: '$1.8M', marketCap: '$23.4M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'fire', stats: { likes: '956', dislikes: '234' } },
    { id: 'shibaultra', rank: 3, name: 'ShibaUltra', ticker: 'SHIBU', price: 0.000156, priceChange: 67.4, volume: '$3.1M', marketCap: '$78.9M', risk: 'HIGH', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'lightning', stats: { likes: '1456', dislikes: '167' } },
    { id: 'mooncat', rank: 4, name: 'MoonCat', ticker: 'MCAT', price: 0.000345, priceChange: 45.8, volume: '$878K', marketCap: '$12.1M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'fire', stats: { likes: '678', dislikes: '123' } },
    { id: 'rocketdoge', rank: 5, name: 'RocketDoge', ticker: 'RDOGE', price: 0.000456, priceChange: 234.8, volume: '$3.2M', marketCap: '$98.6M', risk: 'HIGH', logo: 'https://i.imgur.com/AM6M2Gj.png', icon: 'rocket', stats: { likes: '2134', dislikes: '245' } },
];

// Data for MEMEWARM
export const warmCoins: Coin[] = [
    { id: 'diamondhands', rank: 1, name: 'DiamondHands', ticker: 'DIAMOND', price: 0.000789, priceChange: 23.5, volume: '$1.2M', marketCap: '$24.5M', risk: 'LOW', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'diamond', stats: { likes: '567', dislikes: '89' } },
    { id: 'apestrong', rank: 2, name: 'ApeStrong', ticker: 'APES', price: 0.001567, priceChange: 18.9, volume: '$887K', marketCap: '$16.8M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'fire', stats: { likes: '834', dislikes: '156' } },
    { id: 'hodltoken', rank: 3, name: 'HODLToken', ticker: 'HODL', price: 0.000234, priceChange: 12.3, volume: '$645K', marketCap: '$8.8M', risk: 'LOW', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'diamond', stats: { likes: '345', dislikes: '67' } },
    { id: 'memelord', rank: 4, name: 'MemeLord', ticker: 'MLORD', price: 0.0003456, priceChange: 34.7, volume: '$1.5M', marketCap: '$42.1M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'fire', stats: { likes: '789', dislikes: '134' } },
];

// Data for MEMECOLD
export const coldCoins: Coin[] = [
    { id: 'bearmarket', rank: 1, name: 'BearMarket', ticker: 'BEAR', price: 0.000045, priceChange: -23.4, volume: '$86K', marketCap: '$2.3M', risk: 'HIGH', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'bear', stats: { likes: '123', dislikes: '456' } },
    { id: 'frozendoge', rank: 2, name: 'FrozenDoge', ticker: 'FDOGE', price: 0.000022, priceChange: -45.6, volume: '$123K', marketCap: '$1.8M', risk: 'HIGH', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'snowflake', stats: { likes: '88', dislikes: '345' } },
    { id: 'icecoin', rank: 3, name: 'IceCoin', ticker: 'ICE', price: 0.000078, priceChange: -12.8, volume: '$456K', marketCap: '$6.7M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'snowflake', stats: { likes: '123', dislikes: '123' } },
    { id: 'winterwolf', rank: 4, name: 'WinterWolf', ticker: 'WWOLF', price: 0.0000234, priceChange: -5.6, volume: '$670k', marketCap: '$12.0M', risk: 'MEDIUM', logo: 'https://i.imgur.com/8tS5a2L.png', icon: 'wolf', stats: { likes: '456', dislikes: '234' } },
];