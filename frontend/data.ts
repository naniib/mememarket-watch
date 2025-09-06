
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  emoji: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  liquidity: string;
  volatility: number;
  totalSupply: string;
  circulatingSupply: string;
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
    category: "hot" as "hot",
    boosted: true,
    upvotes: 1247,
    downvotes: 89,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "1.2M",
    volatility: "78.5",
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
      { address: "0x1234567890abcdef1234567890abcdef12345678", percentage: "12.5" },
      { address: "0x2345678901bcdef12345678901bcdef123456789", percentage: "8.7" },
      { address: "0x3456789012cdef123456789012cdef1234567890", percentage: "6.2" },
      { address: "0x456789013def1234567890123def12345678901", percentage: "5.1" },
      { address: "0x56789014ef12345678901234ef123456789012", percentage: "4.8" }
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
    category: "hot" as "hot",
    boosted: false,
    upvotes: 956,
    downvotes: 234,
    riskLevel: "LOW" as "LOW",
    liquidity: "890K",
    volatility: "65.2",
    fearGreedIndex: 65,
    bullishVotes: 956,
    bearishVotes: 234,
    totalSupply: "420,690,000,000",
    circulatingSupply: "420,690,000,000",
    topHolders: [
      { address: "0x789012345ef123456789012345ef1234567890123", percentage: "15.2" },
      { address: "0x89012346f1234567890123456f12345678901234", percentage: "9.8" },
      { address: "0x9012347123456789012347123456789012347", percentage: "7.3" },
      { address: "0x0123481234567890123481234567890123481", percentage: "6.1" },
      { address: "0x1234591234567890123491234567890123459", percentage: "5.4" }
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
    category: "hot" as "hot",
    boosted: true,
    upvotes: 1456,
    downvotes: 167,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "2.1M",
    volatility: "82.3",
    fearGreedIndex: 82,
    bullishVotes: 1456,
    bearishVotes: 167,
    totalSupply: "1,000,000,000,000",
    circulatingSupply: "500,000,000,000",
    topHolders: [
      { address: "0x234560123456789012345601234567890123456", percentage: "18.7" },
      { address: "0x345671234567890123456712345678901234567", percentage: "12.3" },
      { address: "0x456782345678901234567823456789012345678", percentage: "9.6" },
      { address: "0x567893456789012345678934567890123456789", percentage: "7.2" },
      { address: "0x678904567890123456789045678901234567890", percentage: "6.8" }
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
    category: "hot" as "hot",
    boosted: false,
    upvotes: 678,
    downvotes: 123,
    riskLevel: "LOW" as "LOW",
    liquidity: "456K",
    volatility: "58.9",
    fearGreedIndex: 58,
    bullishVotes: 678,
    bearishVotes: 123,
    totalSupply: "100,000,000",
    circulatingSupply: "80,000,000",
    topHolders: [
      { address: "0x789015678901234567890156789012345678901", percentage: "22.1" },
      { address: "0x890126789012345678901267890123456789012", percentage: "14.5" },
      { address: "0x901237890123456789012378901234567890123", percentage: "11.2" },
      { address: "0x012348901234567890123489012345678901234", percentage: "8.9" },
      { address: "0x123459012345678901234590123456789012345", percentage: "7.6" }
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
    category: "hot" as "hot",
    boosted: true,
    upvotes: 2134,
    downvotes: 245,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "3.4M",
    volatility: "95.7",
    fearGreedIndex: 92,
    bullishVotes: 2134,
    bearishVotes: 245,
    totalSupply: "10,000,000,000",
    circulatingSupply: "7,500,000,000",
    topHolders: [
      { address: "0x234561234567890123456123456789012345612", percentage: "25.3" },
      { address: "0x345672345678901234567234567890123456723", percentage: "18.9" },
      { address: "0x456783456789012345678345678901234567834", percentage: "12.1" },
      { address: "0x567894567890123456789456789012345678945", percentage: "9.7" },
      { address: "0x678905678901234567890567890123456789056", percentage: "8.2" }
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
    category: "warm" as "warm",
    boosted: false,
    upvotes: 567,
    downvotes: 89,
    riskLevel: "LOW" as "LOW",
    liquidity: "678K",
    volatility: "45.3",
    totalSupply: "500,000,000",
    circulatingSupply: "400,000,000",
    contractAddress: "DiamondHandsAddrSGVHGS6787SGF67GSF67SGF6S7GS6",
    socials: {
        website: "https://example.com",
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example",
        discord: "https://discord.gg/example",
    },
    topHolders: [
      { address: "0x789016789012345678901678901234567890167", percentage: "19.4" },
      { address: "0x890127890123456789012789012345678901278", percentage: "13.2" },
      { address: "0x901238901234567890123890123456789012389", percentage: "10.8" },
      { address: "0x012349012345678901234901234567890123490", percentage: "8.5" },
      { address: "0x123450123456789012345012345678901234501", percentage: "7.3" }
    ]
  },
  {
    id: "ape-strong",
    name: "ApeStrong",
    symbol: "APES",
    emoji: "🦍",
    price: "0.001567",
    change24h: 18.9,
    volume24h: "897K",
    marketCap: "19.8M",
    category: "warm" as "warm",
    boosted: true,
    upvotes: 834,
    downvotes: 156,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "445K",
    volatility: "52.1",
    totalSupply: "250,000,000",
    circulatingSupply: "200,000,000",
    topHolders: [
      { address: "0x234562345678901234562345678901234562345", percentage: "16.7" },
      { address: "0x345673456789012345673456789012345673456", percentage: "12.9" },
      { address: "0x456784567890123456784567890123456784567", percentage: "9.4" },
      { address: "0x567895678901234567895678901234567895678", percentage: "8.1" },
      { address: "0x678906789012345678906789012345678906789", percentage: "6.8" }
    ]
  },
  {
    id: "hodl-token",
    name: "HODLToken",
    symbol: "HODL",
    emoji: "🙌",
    price: "0.000234",
    change24h: 12.3,
    volume24h: "543K",
    marketCap: "8.9M",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 345,
    downvotes: 67,
    riskLevel: "LOW" as "LOW",
    liquidity: "234K",
    volatility: "38.7",
    totalSupply: "1,000,000,000",
    circulatingSupply: "750,000,000",
    topHolders: [
      { address: "0x789017890123456789017890123456789017890", percentage: "21.2" },
      { address: "0x890128901234567890128901234567890128901", percentage: "15.6" },
      { address: "0x901239012345678901239012345678901239012", percentage: "11.3" },
      { address: "0x012340123456789012340123456789012340123", percentage: "9.1" },
      { address: "0x123451234567890123451234567890123451234", percentage: "7.8" }
    ]
  },
  {
    id: "meme-lord",
    name: "MemeLord",
    symbol: "MLORD",
    emoji: "👑",
    price: "0.003456",
    change24h: 34.7,
    volume24h: "1.5M",
    marketCap: "42.1M",
    category: "warm" as "warm",
    boosted: false,
    upvotes: 789,
    downvotes: 134,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "567K",
    volatility: "61.4",
    totalSupply: "150,000,000",
    circulatingSupply: "120,000,000",
    topHolders: [
      { address: "0x234563456789012345634567890123456345678", percentage: "17.9" },
      { address: "0x345674567890123456745678901234567456789", percentage: "13.4" },
      { address: "0x456785678901234567856789012345678567890", percentage: "10.2" },
      { address: "0x567896789012345678967890123456789678901", percentage: "8.7" },
      { address: "0x678907890123456789078901234567890789012", percentage: "7.1" }
    ]
  },
  {
    id: "space-doge",
    name: "SpaceDoge",
    symbol: "SDOGE",
    emoji: "🛸",
    price: "0.000567",
    change24h: 28.4,
    volume24h: "1.1M",
    marketCap: "25.7M",
    category: "warm" as "warm",
    boosted: true,
    upvotes: 892,
    downvotes: 178,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "567K",
    volatility: "64.2",
    totalSupply: "500,000,000",
    circulatingSupply: "400,000,000",
    topHolders: [
      { address: "0x789018901234567890189012345678901890123", percentage: "18.3" },
      { address: "0x890129012345678901290123456789012901234", percentage: "14.7" },
      { address: "0x901230123456789012301234567890123012345", percentage: "11.5" },
      { address: "0x012341234567890123412345678901234123456", percentage: "9.8" },
      { address: "0x123452345678901234523456789012345234567", percentage: "8.1" }
    ]
  },

  // COLD COINS
  {
    id: "bear-market",
    name: "BearMarket",
    symbol: "BEAR",
    emoji: "🐻",
    price: "0.000045",
    change24h: -23.4,
    volume24h: "234K",
    marketCap: "3.4M",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 123,
    downvotes: 456,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "89K",
    volatility: "72.8",
    totalSupply: "2,000,000,000",
    circulatingSupply: "1,500,000,000",
    topHolders: [
      { address: "0x789018901234567890189012345678901890123", percentage: "28.5" },
      { address: "0x890129012345678901290123456789012901234", percentage: "21.3" },
      { address: "0x901230123456789012301234567890123012345", percentage: "16.7" },
      { address: "0x012341234567890123412345678901234123456", percentage: "12.9" },
      { address: "0x123452345678901234523456789012345234567", percentage: "8.4" }
    ]
  },
  {
    id: "frozen-doge",
    name: "FrozenDoge",
    symbol: "FDOGE",
    emoji: "❄️",
    price: "0.000012",
    change24h: -45.6,
    volume24h: "123K",
    marketCap: "1.8M",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 89,
    downvotes: 345,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "45K",
    volatility: "89.3",
    totalSupply: "5,000,000,000",
    circulatingSupply: "3,000,000,000",
    topHolders: [
      { address: "0x234564567890123456456789012345645678901", percentage: "35.2" },
      { address: "0x345675678901234567567890123456756789012", percentage: "24.8" },
      { address: "0x456786789012345678678901234567867890123", percentage: "18.1" },
      { address: "0x567897890123456789789012345678978901234", percentage: "13.6" },
      { address: "0x678908901234567890890123456789089012345", percentage: "7.9" }
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
    category: "cold" as "cold",
    boosted: false,
    upvotes: 234,
    downvotes: 123,
    riskLevel: "MEDIUM" as "MEDIUM",
    liquidity: "234K",
    volatility: "56.2",
    totalSupply: "800,000,000",
    circulatingSupply: "600,000,000",
    topHolders: [
      { address: "0x789019012345678901901234567890190123456", percentage: "20.4" },
      { address: "0x890120123456789012012345678901201234567", percentage: "16.8" },
      { address: "0x901231234567890123123456789012312345678", percentage: "13.2" },
      { address: "0x012342345678901234234567890123423456789", percentage: "10.7" },
      { address: "0x123453456789012345345678901234534567890", percentage: "9.1" }
    ]
  },
  {
    id: "winter-wolf",
    name: "WinterWolf",
    symbol: "WWOLF",
    emoji: "🐺",
    price: "0.000234",
    change24h: -5.6,
    volume24h: "678K",
    marketCap: "12.4M",
    category: "cold" as "cold",
    boosted: true,
    upvotes: 456,
    downvotes: 234,
    riskLevel: "LOW" as "LOW",
    liquidity: "345K",
    volatility: "42.9",
    totalSupply: "300,000,000",
    circulatingSupply: "250,000,000",
    topHolders: [
      { address: "0x234565678901234565678901234565678901234", percentage: "18.9" },
      { address: "0x345676789012345676789012345676789012345", percentage: "14.3" },
      { address: "0x456787890123456787890123456787890123456", percentage: "11.7" },
      { address: "0x567898901234567898901234567898901234567", percentage: "9.2" },
      { address: "0x678909012345678909012345678909012345678", percentage: "7.8" }
    ]
  },
  {
    id: "shadow-cat",
    name: "ShadowCat",
    symbol: "SCAT",
    emoji: "🐈‍⬛",
    price: "0.000156",
    change24h: -18.7,
    volume24h: "345K",
    marketCap: "7.8M",
    category: "cold" as "cold",
    boosted: false,
    upvotes: 178,
    downvotes: 289,
    riskLevel: "HIGH" as "HIGH",
    liquidity: "123K",
    volatility: "67.4",
    totalSupply: "750,000,000",
    circulatingSupply: "600,000,000",
    topHolders: [
      { address: "0x789020901234567890209012345678902090123", percentage: "24.6" },
      { address: "0x890131012345678901310123456789013101234", percentage: "19.2" },
      { address: "0x901242123456789012421234567890124212345", percentage: "15.8" },
      { address: "0x012353234567890123532345678901235323456", percentage: "11.4" },
      { address: "0x123464345678901234643456789012346434567", percentage: "9.7" }
    ]
  }
];

// This function adapts the raw data to be compatible with the application's components
const adaptCoinData = (rawCoins: any[]): Coin[] => {
  return rawCoins.map(coin => ({
    ...coin,
    price: parseFloat(coin.price),
    volatility: parseFloat(coin.volatility),
    // Provide default values for optional fields to ensure consistency
    fearGreedIndex: coin.fearGreedIndex || 50, // Default to neutral
    bullishVotes: coin.bullishVotes || coin.upvotes, // Default to upvotes if not present
    bearishVotes: coin.bearishVotes || coin.downvotes, // Default to downvotes if not present
    // Add rank and parse percentage for topHolders
    topHolders: coin.topHolders.map((holder: any, index: number) => ({
      ...holder,
      rank: index + 1,
      percentage: parseFloat(holder.percentage)
    })),
    // Add a mock audit object to prevent crashes on the detail page
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