
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  emoji: string;
  price: number;
  change24h: number;
  marketCap: string;
  totalMarketCap: string;
  volume24h: string;
  liquidity: string;
  volatility: number;
  totalSupply: string;
  circulatingSupply: string;
  circSupplyPercentage: number;
  holders: number;
  totalTx: string;
  pooledSol: number;
  pooledMemecoin: string;
  pooledMemecoinPercentage: number;
  poolCreated: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  boosted: boolean;
  upvotes: number;
  downvotes: number;
  audit: {
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
    summary: string;
    details: { check: string; result: 'PASS' | 'WARN' | 'FAIL' }[];
  };
  topHolders: { rank: number; address: string; percentage: number }[];
  fearGreedIndex: number;
  bullishVotes: number;
  bearishVotes: number;
  category: 'hot' | 'warm' | 'cold';
  contractAddress?: string;
  socials?: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

const rawMockCoins = [
  // HOT COINS
  {
    id: "doge2-moon",
    name: "Doge2Moon",
    symbol: "DOGE2",
    emoji: "🚀",
    price: "0.001234",
    change24h: 156.7,
    volume24h: "2.4M",
    marketCap: "45.6M",
    totalMarketCap: "53.6M",
    circSupplyPercentage: 85,
    holders: 8610,
    totalTx: ">100k",
    pooledSol: 780.79,
    pooledMemecoin: "94.45M",
    pooledMemecoinPercentage: 9.44,
    poolCreated: "7/4/2025 23:24",
    category: "hot" as "hot",
    boosted: true,
    upvotes: 1247,
    downvotes: 89,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "1.2M",
    volatility: 0.7454,
    fearGreedIndex: 78,
    bullishVotes: 1247,
    bearishVotes: 456,
    totalSupply: "1,000,000,000",
    circulatingSupply: "850,000,000",
    contractAddress: "Doge2MoonAddress7890abcdef1234567890abcdef123456",
    socials: {
      website: "https://example.com",
      twitter: "https://twitter.com/example",
      telegram: "https://t.me/example",
    },
    topHolders: [
      { address: "0x1234...5678", percentage: "12.5" },
      { address: "0x2345...6789", percentage: "8.7" },
      { address: "0x3456...7890", percentage: "6.2" },
      { address: "0x4567...8901", percentage: "5.1" },
      { address: "0x5678...9012", percentage: "4.8" },
      { address: "0x6789...0123", percentage: "4.5" },
      { address: "0x7890...1234", percentage: "4.2" },
      { address: "0x8901...2345", percentage: "3.9" },
      { address: "0x9012...3456", percentage: "3.5" },
      { address: "0x0123...4567", percentage: "3.1" }
    ]
  },
  {
    id: "pepe3-coin",
    name: "Pepe3.0",
    symbol: "PEPE3",
    emoji: "🐸",
    price: "0.000089",
    change24h: 89.3,
    volume24h: "1.8M",
    marketCap: "23.4M",
    totalMarketCap: "23.4M",
    circSupplyPercentage: 100,
    holders: 12500,
    totalTx: ">250k",
    pooledSol: 540.21,
    pooledMemecoin: "1.2B",
    pooledMemecoinPercentage: 12.5,
    poolCreated: "6/15/2025 12:00",
    category: "hot" as "hot",
    boosted: false,
    upvotes: 956,
    downvotes: 234,
    riskLevel: "LOW" as "LOW",
    liquidity: "890K",
    volatility: 0.652,
    fearGreedIndex: 65,
    bullishVotes: 956,
    bearishVotes: 234,
    totalSupply: "420,690,000,000",
    circulatingSupply: "420,690,000,000",
    contractAddress: "Pepe3CoinAddressABCDEF1234567890ABCDEF1234567890",
    socials: { website: "https://example.com", twitter: "https://twitter.com/example", telegram: "https://t.me/example" },
    topHolders: [
      { address: "0x7890...0123", percentage: "15.2" },
      { address: "0x8901...1234", percentage: "9.8" },
      { address: "0x9012...2345", percentage: "7.3" },
      { address: "0x0123...3456", percentage: "6.1" },
      { address: "0x1234...4567", percentage: "5.4" }
    ]
  },
  {
    id: "shiba-ultra",
    name: "ShibaUltra",
    symbol: "SHIBU",
    emoji: "🐕",
    price: "0.000156",
    change24h: 67.4,
    volume24h: "3.1M",
    marketCap: "78.9M",
    totalMarketCap: "157.8M",
    circSupplyPercentage: 50,
    holders: 25000,
    totalTx: ">500k",
    pooledSol: 1200.5,
    pooledMemecoin: "50B",
    pooledMemecoinPercentage: 5.0,
    poolCreated: "5/1/2025 08:30",
    category: "hot" as "hot",
    boosted: true,
    upvotes: 1456,
    downvotes: 167,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "2.1M",
    volatility: 0.823,
    fearGreedIndex: 82,
    bullishVotes: 1456,
    bearishVotes: 167,
    totalSupply: "1,000,000,000,000",
    circulatingSupply: "500,000,000,000",
    socials: { discord: "https://discord.gg/example" },
    topHolders: [
      { address: "0x2345...4567", percentage: "18.7" },
      { address: "0x3456...5678", percentage: "12.3" },
      { address: "0x4567...6789", percentage: "9.6" }
    ]
  },
  {
    id: "moon-cat",
    name: "MoonCat",
    symbol: "MCAT",
    emoji: "🐱",
    price: "0.002345",
    change24h: 45.8,
    volume24h: "876K",
    marketCap: "12.3M",
    totalMarketCap: "15.4M",
    circSupplyPercentage: 80,
    holders: 4500,
    totalTx: ">50k",
    pooledSol: 300,
    pooledMemecoin: "10M",
    pooledMemecoinPercentage: 10,
    poolCreated: "7/1/2025 18:00",
    category: "hot" as "hot",
    boosted: false,
    upvotes: 678,
    downvotes: 123,
    riskLevel: "LOW" as "LOW",
    liquidity: "456K",
    volatility: 0.589,
    fearGreedIndex: 58,
    bullishVotes: 678,
    bearishVotes: 123,
    totalSupply: "100,000,000",
    circulatingSupply: "80,000,000",
    topHolders: [
      { address: "0xAbC1...dEfa", percentage: "10.1" }
    ]
  },
  {
    id: "rocket-doge",
    name: "RocketDoge",
    symbol: "RDOGE",
    emoji: "🚀",
    price: "0.000345",
    change24h: 234.6,
    volume24h: "5.2M",
    marketCap: "89.4M",
    totalMarketCap: "119.2M",
    circSupplyPercentage: 75,
    holders: 35000,
    totalTx: ">1M",
    pooledSol: 2500,
    pooledMemecoin: "1B",
    pooledMemecoinPercentage: 10,
    poolCreated: "4/20/2025 04:20",
    category: "hot" as "hot",
    boosted: true,
    upvotes: 2134,
    downvotes: 245,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "3.4M",
    volatility: 0.957,
    fearGreedIndex: 92,
    bullishVotes: 2134,
    bearishVotes: 245,
    totalSupply: "10,000,000,000",
    circulatingSupply: "7,500,000,000",
    topHolders: [
      { address: "0xDeF1...aBcd", percentage: "15.3" }
    ]
  },

  // WARM COINS
  {
    id: "diamond-hands",
    name: "DiamondHands",
    symbol: "DIAMOND",
    emoji: "💎",
    price: "0.000789",
    change24h: 23.5,
    volume24h: "1.2M",
    marketCap: "34.5M",
    totalMarketCap: "39.5M",
    circSupplyPercentage: 80,
    holders: 6000,
    totalTx: ">80k",
    pooledSol: 450,
    pooledMemecoin: "50M",
    pooledMemecoinPercentage: 8,
    poolCreated: "6/1/2025 10:00",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 567,
    downvotes: 89,
    riskLevel: "LOW" as "LOW",
    liquidity: "678K",
    volatility: 0.453,
    fearGreedIndex: 55,
    bullishVotes: 567,
    bearishVotes: 89,
    totalSupply: "500,000,000",
    circulatingSupply: "400,000,000",
    contractAddress: "DiamondHandsAddrSGVHGS6787SGF67GSF67SGF6S7GS6",
    socials: { website: "https://example.com", twitter: "https://twitter.com/example", telegram: "https://t.me/example", discord: "https://discord.gg/example" },
    topHolders: [
      { address: "0x7890...9012", percentage: "19.4" }
    ]
  },
  {
    id: "ape-strong",
    name: "ApeStrong",
    symbol: "APES",
    emoji: "🦍",
    price: "0.001567",
    change24h: 18.9,
    volume24h: "887K",
    marketCap: "16.8M",
    totalMarketCap: "20.1M",
    circSupplyPercentage: 83,
    holders: 7200,
    totalTx: ">60k",
    pooledSol: 380,
    pooledMemecoin: "40M",
    pooledMemecoinPercentage: 7.5,
    poolCreated: "5/25/2025 14:00",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 834,
    downvotes: 156,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "550K",
    volatility: 0.512,
    fearGreedIndex: 62,
    bullishVotes: 834,
    bearishVotes: 156,
    totalSupply: "250,000,000",
    circulatingSupply: "207,500,000",
    topHolders: [
      { address: "0xabc1...678s", percentage: "11.2" }
    ]
  },
  {
    id: "hodl-token",
    name: "HODLToken",
    symbol: "HODL",
    emoji: "🙌",
    price: "0.000234",
    change24h: 12.3,
    volume24h: "645K",
    marketCap: "8.8M",
    totalMarketCap: "10.0M",
    circSupplyPercentage: 88,
    holders: 3100,
    totalTx: ">30k",
    pooledSol: 200,
    pooledMemecoin: "20M",
    pooledMemecoinPercentage: 5,
    poolCreated: "5/20/2025 11:00",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 345,
    downvotes: 67,
    riskLevel: "LOW" as "LOW",
    liquidity: "320K",
    volatility: 0.380,
    fearGreedIndex: 51,
    bullishVotes: 345,
    bearishVotes: 67,
    totalSupply: "100,000,000",
    circulatingSupply: "88,000,000",
    topHolders: [
      { address: "0xHODL...T0KN", percentage: "9.5" }
    ]
  },
  {
    id: "meme-lord",
    name: "MemeLord",
    symbol: "MLORD",
    emoji: "👑",
    price: "0.0003456",
    change24h: 34.7,
    volume24h: "1.5M",
    marketCap: "42.1M",
    totalMarketCap: "50.0M",
    circSupplyPercentage: 84,
    holders: 15000,
    totalTx: ">120k",
    pooledSol: 600,
    pooledMemecoin: "75M",
    pooledMemecoinPercentage: 10,
    poolCreated: "6/10/2025 20:00",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 789,
    downvotes: 134,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "800K",
    volatility: 0.620,
    fearGreedIndex: 68,
    bullishVotes: 789,
    bearishVotes: 134,
    totalSupply: "1,000,000,000",
    circulatingSupply: "840,000,000",
    topHolders: [
      { address: "0xL0RD...MEME", percentage: "14.0" }
    ]
  },
  {
    id: "safe-ape",
    name: "SafeApe",
    symbol: "SAFEAPE",
    emoji: "🛡️",
    price: "0.000912",
    change24h: 9.8,
    volume24h: "750K",
    marketCap: "15.5M",
    totalMarketCap: "18.0M",
    circSupplyPercentage: 86,
    holders: 4200,
    totalTx: ">45k",
    pooledSol: 250,
    pooledMemecoin: "25M",
    pooledMemecoinPercentage: 6,
    poolCreated: "6/12/2025 16:00",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 411,
    downvotes: 72,
    riskLevel: "LOW" as "LOW",
    liquidity: "400K",
    volatility: 0.410,
    fearGreedIndex: 53,
    bullishVotes: 411,
    bearishVotes: 72,
    totalSupply: "200,000,000",
    circulatingSupply: "172,000,000",
    topHolders: [
      { address: "0xSAFE...AAPE", percentage: "8.1" }
    ]
  },
  
  // COLD COINS
  {
    id: "bear-market",
    name: "BearMarket",
    symbol: "BEAR",
    emoji: "📉",
    price: "0.000045",
    change24h: -23.4,
    volume24h: "86K",
    marketCap: "2.3M",
    totalMarketCap: "4.6M",
    circSupplyPercentage: 50,
    holders: 1200,
    totalTx: ">10k",
    pooledSol: 50,
    pooledMemecoin: "5M",
    pooledMemecoinPercentage: 2,
    poolCreated: "3/1/2025 01:00",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 123,
    downvotes: 456,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "120K",
    volatility: 0.890,
    fearGreedIndex: 18,
    bullishVotes: 123,
    bearishVotes: 456,
    totalSupply: "100,000,000",
    circulatingSupply: "50,000,000",
    topHolders: [
      { address: "0xBEAR...MRKT", percentage: "25.0" }
    ]
  },
  {
    id: "frozen-doge",
    name: "FrozenDoge",
    symbol: "FDOGE",
    emoji: "❄️",
    price: "0.000022",
    change24h: -45.6,
    volume24h: "123K",
    marketCap: "1.8M",
    totalMarketCap: "2.2M",
    circSupplyPercentage: 81,
    holders: 900,
    totalTx: ">8k",
    pooledSol: 40,
    pooledMemecoin: "4M",
    pooledMemecoinPercentage: 3,
    poolCreated: "2/15/2025 15:00",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 88,
    downvotes: 345,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "100K",
    volatility: 1.12,
    fearGreedIndex: 12,
    bullishVotes: 88,
    bearishVotes: 345,
    totalSupply: "100,000,000",
    circulatingSupply: "81,000,000",
    topHolders: [
      { address: "0xFRZN...D0GE", percentage: "17.5" }
    ]
  },
  {
    id: "ice-coin",
    name: "IceCoin",
    symbol: "ICE",
    emoji: "🧊",
    price: "0.000078",
    change24h: -12.8,
    volume24h: "456K",
    marketCap: "6.7M",
    totalMarketCap: "7.8M",
    circSupplyPercentage: 86,
    holders: 2500,
    totalTx: ">25k",
    pooledSol: 150,
    pooledMemecoin: "15M",
    pooledMemecoinPercentage: 6,
    poolCreated: "1/10/2025 10:10",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 210,
    downvotes: 180,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "280K",
    volatility: 0.75,
    fearGreedIndex: 25,
    bullishVotes: 210,
    bearishVotes: 180,
    totalSupply: "100,000,000",
    circulatingSupply: "86,000,000",
    topHolders: [
      { address: "0xICE...C0IN", percentage: "11.8" }
    ]
  },
  {
    id: "winter-wolf",
    name: "WinterWolf",
    symbol: "WWOLF",
    emoji: "🐺",
    price: "0.0000234",
    change24h: -5.6,
    volume24h: "670k",
    marketCap: "12.0M",
    totalMarketCap: "12.0M",
    circSupplyPercentage: 100,
    holders: 4000,
    totalTx: ">40k",
    pooledSol: 220,
    pooledMemecoin: "30M",
    pooledMemecoinPercentage: 8,
    poolCreated: "12/21/2024 00:00",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 456,
    downvotes: 234,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "400K",
    volatility: 0.68,
    fearGreedIndex: 35,
    bullishVotes: 456,
    bearishVotes: 234,
    totalSupply: "512,000,000",
    circulatingSupply: "512,000,000",
    topHolders: [
      { address: "0xW0LF...WNTR", percentage: "13.2" }
    ]
  },
  {
    id: "rug-survivor",
    name: "RugSurvivor",
    symbol: "SURVIVE",
    emoji: "⛑️",
    price: "0.000011",
    change24h: -2.1,
    volume24h: "55K",
    marketCap: "1.1M",
    totalMarketCap: "1.1M",
    circSupplyPercentage: 100,
    holders: 750,
    totalTx: ">5k",
    pooledSol: 25,
    pooledMemecoin: "2M",
    pooledMemecoinPercentage: 1.5,
    poolCreated: "11/30/2024 13:00",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 150,
    downvotes: 140,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "80K",
    volatility: 0.98,
    fearGreedIndex: 22,
    bullishVotes: 150,
    bearishVotes: 140,
    totalSupply: "100,000,000",
    circulatingSupply: "100,000,000",
    topHolders: [
      { address: "0x5URV...1V0R", percentage: "21.3" }
    ]
  },
];

// This function adapts the raw data to be compatible with the application's components
const adaptCoinData = (rawCoins: any[]): Coin[] => {
  return rawCoins.map(coin => ({
    ...coin,
    price: parseFloat(coin.price),
    volatility: parseFloat(coin.volatility) || 0,
    fearGreedIndex: coin.fearGreedIndex || 50, // Default to neutral
    bullishVotes: coin.bullishVotes || coin.upvotes, // Default to upvotes if not present
    bearishVotes: coin.bearishVotes || coin.downvotes, // Default to downvotes if not present
    topHolders: (coin.topHolders || []).map((holder: any, index: number) => ({
      ...holder,
      rank: index + 1,
      percentage: parseFloat(holder.percentage)
    })),
    audit: {
      risk: coin.riskLevel,
      summary: `This is a mock audit summary for ${coin.name}. ${
        coin.riskLevel === 'HIGH' ? 'High risk factors detected.' :
        coin.riskLevel === 'MEDIUM' ? 'Some warnings found.' :
        'All standard checks passed.'
      }`,
      details: [
        { check: 'Contract Verified', result: 'PASS' },
        { check: 'Honeypot Analysis', result: 'PASS' },
        ...(coin.riskLevel === 'HIGH' ? [{ check: 'Liquidity Lock', result: 'FAIL' as 'FAIL' }] : []),
        ...(coin.riskLevel === 'MEDIUM' ? [{ check: 'Ownership Renounced', result: 'WARN' as 'WARN' }] : []),
        { check: 'Transaction Tax', result: 'PASS' }
      ]
    }
  }));
};

// Processed and exported coins list
export const mockCoins: Coin[] = adaptCoinData(rawMockCoins);

// Export allCoins for pages that need the full list (e.g., CoinDetailPage)
export const allCoins: Coin[] = mockCoins;