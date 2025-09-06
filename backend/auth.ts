import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './db.js'; // FIX: Import from db.js to avoid circular dependency

// JWT Secret (in production, this should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Registration function
export async function registerUser(userData: any) {
    const { email, password, username } = userData;
    try {
        // Check if user already exists
        const existingUserQuery = `
      SELECT id FROM users 
      WHERE email = $1 OR username = $2
    `;
        const existingUserResult = await pool.query(existingUserQuery, [email, username]);
        if (existingUserResult.rows.length > 0) {
            throw new Error('User with this email or username already exists');
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create new user
        const insertUserQuery = `
      INSERT INTO users (email, username, password_hash, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, email, username, created_at
    `;
        const newUserResult = await pool.query(insertUserQuery, [email, username, hashedPassword]);
        const newUser = newUserResult.rows[0];
        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });
        // Return user data without password
        return {
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                created_at: newUser.created_at
            },
            token
        };
    }
    catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// Login function
export async function loginUser(loginData: any) {
    const { email, password } = loginData;
    try {
        // Find user by email
        const findUserQuery = `
      SELECT id, email, username, password_hash, created_at
      FROM users 
      WHERE email = $1
    `;
        const userResult = await pool.query(findUserQuery, [email]);
        if (userResult.rows.length === 0) {
            throw new Error('Invalid email or password');
        }
        const user = userResult.rows[0];
        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        // Return user data without password
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                created_at: user.created_at
            },
            token
        };
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
