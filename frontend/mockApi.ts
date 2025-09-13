// frontend/mockApi.ts

// --- MOCK DATABASE via localStorage ---
const MOCK_DB = {
    users: [
        { 
            id: 1, 
            username: 'MemeMarketWatchOficial', 
            email: 'test@mememarket.com', 
            password: 'password', 
            fidelity_points: 1337, 
            created_at: new Date(Date.now() - 86400000 * 10).toISOString(), 
            badge: 'admin',
            bio: 'Uniting the power of memes with financial education and earnings. Your platform for analyzing the market in a fun way.',
            joinedDate: '2023-08-15T10:00:00.000Z',
            followersCount: 10,
            followingCount: 10,
            avatarUrl: 'https://i.imgur.com/7gM4M1k.png', // Cute cat avatar
            bannerUrl: 'https://i.imgur.com/4z25m2C.png' // MemeMarketWatch banner
        },
        { 
            id: 2, 
            username: 'Vitalik', 
            email: 'vitalik@ethereum.org', 
            password: 'password', 
            fidelity_points: 9001, 
            created_at: new Date(Date.now() - 86400000 * 5).toISOString(), 
            badge: null,
            bio: 'Co-founder of Ethereum. Into decentralization, cryptography, and memecoins on the side.',
            joinedDate: '2022-01-20T12:00:00.000Z',
            followersCount: 1500000,
            followingCount: 500,
            avatarUrl: 'https://i.pravatar.cc/150?u=vitalik',
            bannerUrl: 'https://i.imgur.com/lZ2a92h.png' // Abstract banner
        },
        { 
            id: 3, 
            username: 'CryptoDegen', 
            email: 'degen@ape.in', 
            password: 'password', 
            fidelity_points: 100, 
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(), 
            badge: 'analyst',
            bio: 'Aping into the next 1000x. Not financial advice.',
            joinedDate: '2024-03-10T14:30:00.000Z',
            followersCount: 5800,
            followingCount: 120,
            avatarUrl: 'https://i.pravatar.cc/150?u=degen',
            bannerUrl: 'https://i.imgur.com/lZ2a92h.png'
        },
    ],
    posts: [
        { id: 1, userId: 1, content: 'Real Degens keep hodlin!', createdAt: new Date(Date.now() - 3600000 * 13).toISOString(), shareCount: 5, likes: 120, comments: 15 },
        { id: 2, userId: 1, content: 'Remember to DYOR before aping into any memecoin.', createdAt: new Date(Date.now() - 86400000).toISOString(), shareCount: 12, likes: 88, comments: 5 },
        { id: 3, userId: 2, content: 'Just deployed a new contract. Might be the next big thing.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), shareCount: 500, likes: 12000, comments: 340 },
        { id: 4, userId: 3, content: '$DOGE2MOON is looking spicy today!', createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), shareCount: 25, likes: 300, comments: 45 },
    ],
    messages: {
        'doge2moon': [
            { id: 1, text: 'Doge2Moon is flying!', userId: 1, username: 'Satoshi', coinId: 'doge2moon', createdAt: new Date(Date.now() - 60000 * 10).toISOString(), badge: 'admin' },
            { id: 2, text: 'This is gonna be bigger than SHIB!', userId: 2, username: 'Vitalik', coinId: 'doge2moon', createdAt: new Date(Date.now() - 60000 * 5).toISOString(), badge: null },
        ],
        'diamondhands': [
            { id: 3, text: 'This coin is about to moon! 🚀', userId: 3, username: 'CryptoDegen', coinId: 'diamondhands', createdAt: new Date(Date.now() - 120000).toISOString(), badge: 'analyst' },
        ]
    },
    nextIds: {
        user: 7,
        post: 5,
        message: 7,
    }
};

const initDb = () => {
    if (!localStorage.getItem('mockDb')) {
        localStorage.setItem('mockDb', JSON.stringify(MOCK_DB));
    }
};

const getDb = () => {
    initDb();
    // Quick migration for new fields if needed
    const db = JSON.parse(localStorage.getItem('mockDb')!);
    if(!db.nextIds) {
        db.nextIds = MOCK_DB.nextIds;
        saveDb(db);
    }
    // Add new fields to existing users if they don't have them
    db.users.forEach((user: any) => {
        if (!user.bio) {
            const defaultUser = MOCK_DB.users.find(u => u.id === user.id) || MOCK_DB.users[0];
            user.bio = defaultUser.bio;
            user.joinedDate = defaultUser.joinedDate;
            user.followersCount = defaultUser.followersCount;
            user.followingCount = defaultUser.followingCount;
            user.avatarUrl = defaultUser.avatarUrl;
            user.bannerUrl = defaultUser.bannerUrl;
        }
    });
    saveDb(db);
    return db;
};

const saveDb = (db: any) => {
    localStorage.setItem('mockDb', JSON.stringify(db));
};

// --- MOCK API FUNCTIONS ---

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const register = async (userData: any) => {
    await delay(500);
    const db = getDb();
    const { email, password, username } = userData;

    if (db.users.find((u: any) => u.email === email || u.username === username)) {
        throw new Error('User with this email or username already exists');
    }

    const newUser = {
        id: db.nextIds.user++,
        email,
        username,
        password, // In a real app, this would be hashed
        fidelity_points: 0,
        created_at: new Date().toISOString(),
        badge: null,
        bio: "Just joined MemeMarket Watch!",
        joinedDate: new Date().toISOString(),
        followersCount: 0,
        followingCount: 0,
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
        bannerUrl: 'https://i.imgur.com/lZ2a92h.png'
    };
    db.users.push(newUser);
    saveDb(db);

    const { password: _p, ...userToReturn } = newUser;
    return {
        success: true,
        user: userToReturn,
        token: `mock-token-for-user-${newUser.id}`
    };
};

export const login = async (loginData: any) => {
    await delay(500);
    const db = getDb();
    const { email, password } = loginData;

    const user = db.users.find((u: any) => u.email === email);
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userToReturn } = user;
    return {
        success: true,
        user: userToReturn,
        token: `mock-token-for-user-${user.id}`
    };
};

export const getUserPosts = async (userId: string) => {
    await delay(500);
    const db = getDb();
    const userIdNum = parseInt(userId);

    const user = db.users.find((u: any) => u.id === userIdNum);
    if (!user) {
        throw new Error('User not found');
    }

    const userPosts = db.posts.filter((p: any) => p.userId === userIdNum).map((p: any) => ({
        ...p,
// FIX: Added avatarUrl to the user object to ensure it is passed to components.
        user: { id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl },
        _count: { likes: p.likes, comments: p.comments }
    })).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userToReturn } = user;

    return {
        success: true,
        user: userToReturn,
        posts: userPosts
    };
};

export const createPost = async (postData: any, token: string) => {
    await delay(500);
    if (!token || !token.startsWith('mock-token-for-user-')) {
        throw new Error('You must be logged in to post.');
    }
    const userId = parseInt(token.replace('mock-token-for-user-', ''));

    const db = getDb();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }

    const newPost = {
        id: db.nextIds.post++,
        userId,
        content: postData.content,
        createdAt: new Date().toISOString(),
        shareCount: 0,
        likes: 0,
        comments: 0,
    };
    db.posts.push(newPost);
    saveDb(db);

    return {
        success: true,
        post: {
            ...newPost,
            user: { id: user.id, username: user.username, email: user.email, avatarUrl: user.avatarUrl },
             _count: {
                likes: newPost.likes,
                comments: newPost.comments
            }
        }
    };
};

export const updateUser = async (userId: string, userData: any, token: string) => {
    await delay(500);
    if (!token || !token.startsWith('mock-token-for-user-')) {
        throw new Error('Authentication error.');
    }
    const loggedInUserId = parseInt(token.replace('mock-token-for-user-', ''));
    if (loggedInUserId !== parseInt(userId)) {
        throw new Error('Forbidden: You can only update your own profile.');
    }

    const db = getDb();
    const userIndex = db.users.findIndex((u: any) => u.id === loggedInUserId);
    if (userIndex === -1) {
        throw new Error('User not found.');
    }

    // Check for conflicts
    if (db.users.some((u: any) => (u.username === userData.username || u.email === userData.email) && u.id !== loggedInUserId)) {
        throw new Error('Username or email is already in use by another account.');
    }

    db.users[userIndex] = { ...db.users[userIndex], ...userData };
    saveDb(db);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...userToReturn } = db.users[userIndex];
    
    return {
        success: true,
        user: userToReturn
    };
};

export const getChatMessages = async (coinId: string) => {
    await delay(300);
    const db = getDb();
    return db.messages[coinId] || [];
};

export const sendChatMessage = async (coinId: string, messageData: any, token: string) => {
    await delay(100);
    if (!token || !token.startsWith('mock-token-for-user-')) {
        throw new Error('You must be logged in to chat.');
    }
    const userId = parseInt(token.replace('mock-token-for-user-', ''));

    const db = getDb();
    const user = db.users.find((u: any) => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }

    const newMessage = {
        id: db.nextIds.message++,
        text: messageData.text,
        userId,
        username: user.username,
        badge: user.badge || null,
        coinId,
        createdAt: new Date().toISOString()
    };
    
    if (!db.messages[coinId]) {
        db.messages[coinId] = [];
    }
    db.messages[coinId].push(newMessage);
    saveDb(db);

    return newMessage;
};