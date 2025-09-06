// frontend/mockApi.ts

// --- MOCK DATABASE via localStorage ---
const MOCK_DB = {
    users: [
        { id: 1, username: 'Satoshi', email: 'test@mememarket.com', password: 'password', fidelity_points: 1337, created_at: new Date(Date.now() - 86400000 * 10).toISOString(), badge: 'admin' },
        { id: 2, username: 'Vitalik', email: 'vitalik@ethereum.org', password: 'password', fidelity_points: 9001, created_at: new Date(Date.now() - 86400000 * 5).toISOString(), badge: null },
        { id: 3, username: 'CryptoDegen', email: 'degen@ape.in', password: 'password', fidelity_points: 100, created_at: new Date(Date.now() - 86400000 * 2).toISOString(), badge: 'analyst' },
        { id: 4, username: 'DiamondHands', email: 'hodl@moon.net', password: 'password', fidelity_points: 500, created_at: new Date(Date.now() - 86400000 * 3).toISOString(), badge: null },
        { id: 5, username: 'MemeAnalyst', email: 'analyst@charts.com', password: 'password', fidelity_points: 250, created_at: new Date(Date.now() - 86400000 * 4).toISOString(), badge: 'analyst' },
        { id: 6, username: 'PumpHunter', email: 'hunter@pump.fun', password: 'password', fidelity_points: 150, created_at: new Date(Date.now() - 86400000 * 1).toISOString(), badge: null },
    ],
    posts: [
        { id: 1, userId: 1, content: 'Just launched MemeMarket Watch! To the moon! 🚀', createdAt: new Date().toISOString(), shareCount: 42, likes: 120, comments: 15 },
        { id: 2, userId: 1, content: 'Remember to DYOR before aping into any memecoin.', createdAt: new Date(Date.now() - 86400000).toISOString(), shareCount: 12, likes: 88, comments: 5 },
    ],
    messages: {
        'doge2moon': [
            { id: 1, text: 'Doge2Moon is flying!', userId: 1, username: 'Satoshi', coinId: 'doge2moon', createdAt: new Date(Date.now() - 60000 * 10).toISOString(), badge: 'admin' },
            { id: 2, text: 'This is gonna be bigger than SHIB!', userId: 2, username: 'Vitalik', coinId: 'doge2moon', createdAt: new Date(Date.now() - 60000 * 5).toISOString(), badge: null },
        ],
        'diamondhands': [
            { id: 3, text: 'This coin is about to moon! 🚀', userId: 3, username: 'CryptoDegen', coinId: 'diamondhands', createdAt: new Date(Date.now() - 120000).toISOString(), badge: 'analyst' },
            { id: 4, text: 'HODL strong brothers! 💎🙌', userId: 4, username: 'DiamondHands', coinId: 'diamondhands', createdAt: new Date(Date.now() - 115000).toISOString(), badge: null },
            { id: 5, text: 'Volume is looking bullish, good entry point', userId: 5, username: 'MemeAnalyst', coinId: 'diamondhands', createdAt: new Date(Date.now() - 60000).toISOString(), badge: 'analyst' },
            { id: 6, text: 'Anyone else seeing this pattern? 📈', userId: 6, username: 'PumpHunter', coinId: 'diamondhands', createdAt: new Date(Date.now() - 55000).toISOString(), badge: null }
        ]
    },
    nextIds: {
        user: 7,
        post: 3,
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
        user: { id: user.id, username: user.username, email: user.email },
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
            user: { id: user.id, username: user.username, email: user.email }
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