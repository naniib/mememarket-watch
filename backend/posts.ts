import jwt from 'jsonwebtoken';
// FIX: Changed to a default import to use explicit express types like express.Request.
// FIX: Use express.Request, express.Response, and express.NextFunction to avoid conflicts with global types.
// FIX: Import Request, Response, and NextFunction directly from express to avoid type conflicts.
// FIX: Use default import for express to avoid type conflicts with global Request/Response.
// FIX: Import Request, Response, and NextFunction from express to resolve type errors.
import express, { Request, Response, NextFunction } from 'express';
import { pool } from './db.js';

// FIX: Helper function to safely send JSON responses and avoid detached ArrayBuffer errors.
// FIX: Use express.Response to specify the correct type and avoid conflicts.
// FIX: Use express.Response type to access .status() method.
// FIX: Use Response type from express import.
// FIX: Use express.Response for correct typing.
// FIX: Use Response type from express to resolve status property error.
function sendJson(res: Response, statusCode: number, data: any) {
  res.status(statusCode).json(JSON.parse(JSON.stringify(data)));
}

// Define an interface for the JWT user payload
interface UserPayload {
  userId: number;
  email: string;
}

// Extend the Express Request interface for type casting purposes.
// FIX: Extend express.Request for correct typing.
// FIX: Use express.Request type for correct typing.
// FIX: Extend Request type from express import.
// FIX: Extend Request type from express.
interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

// JWT Secret (in production, this should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
// FIX: Use express.Request, express.Response, and express.NextFunction types for compatibility with Express middleware.
// FIX: Use express.Request, express.Response, and express.NextFunction for correct typing.
// FIX: Use Request, Response, and NextFunction types from express import.
// FIX: Use Request, Response, and NextFunction types from express.
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return sendJson(res, 401, { error: 'Access token required' });
    }
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return sendJson(res, 403, { error: 'Invalid or expired token' });
        }
        // Add user info to request object
        // FIX: Cast request to AuthenticatedRequest to add the user property.
        (req as AuthenticatedRequest).user = user as UserPayload;
        next();
    });
}

// Helper function to update user fidelity points
async function updateFidelityPoints(userId: number, points: number): Promise<void> {
    try {
        const updateQuery = `
      UPDATE users 
      SET fidelity_points = fidelity_points + $1 
      WHERE id = $2
    `;
        await pool.query(updateQuery, [points, userId]);
    }
    catch (error) {
        console.error('Error updating fidelity points:', error);
        // Don't throw error to avoid breaking the main functionality
    }
}

// Create a new post
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function createPost(req: Request, res: Response) {
    try {
        const { content } = req.body;
        // FIX: Cast request to AuthenticatedRequest to access the user property.
        const userId = (req as AuthenticatedRequest).user!.userId;
        // Validate content
        if (!content || content.trim().length === 0) {
            return sendJson(res, 400, { error: 'Post content is required' });
        }
        // Create new post
        const insertPostQuery = `
      INSERT INTO posts (content, user_id, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id, content, user_id, created_at
    `;
        const newPostResult = await pool.query(insertPostQuery, [content.trim(), userId]);
        const newPost = newPostResult.rows[0];
        // Award fidelity points for creating a post (+10 points)
        await updateFidelityPoints(userId, 10);
        // Get user info for the response
        const getUserQuery = `
      SELECT id, username, email FROM users WHERE id = $1
    `;
        const userResult = await pool.query(getUserQuery, [userId]);
        const user = userResult.rows[0];
        
        const responseData = {
            success: true,
            post: {
                ...newPost,
                user: user
            }
        };

        sendJson(res, 201, responseData);
    }
    catch (error) {
        console.error('Error creating post:', error);
        sendJson(res, 500, { error: 'Failed to create post' });
    }
}

// Get all posts by a specific user
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function getUserPosts(req: Request, res: Response) {
    try {
        const { userId } = req.params;
        const userIdNumber = parseInt(userId);
        // Validate userId
        if (isNaN(userIdNumber)) {
            return sendJson(res, 400, { error: 'Invalid user ID' });
        }
        // Check if user exists
        const userQuery = `
      SELECT id, username, email, fidelity_points FROM users WHERE id = $1
    `;
        const userResult = await pool.query(userQuery, [userIdNumber]);
        if (userResult.rows.length === 0) {
            return sendJson(res, 404, { error: 'User not found' });
        }
        const user = userResult.rows[0];
        // Get all posts by the user
        const postsQuery = `
      SELECT 
        p.id, 
        p.content, 
        p.created_at,
        p.share_count,
        u.id as user_id,
        u.username,
        u.email,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) as like_count,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
    `;
        const postsResult = await pool.query(postsQuery, [userIdNumber]);
        // Format posts with user info
        const posts = postsResult.rows.map(row => ({
            id: row.id,
            content: row.content,
            createdAt: row.created_at,
            shareCount: row.share_count || 0,
            user: {
                id: row.user_id,
                username: row.username,
                email: row.email
            },
            _count: {
                likes: parseInt(row.like_count) || 0,
                comments: parseInt(row.comment_count) || 0
            }
        }));
        
        const responseData = {
            success: true,
            posts: posts,
            user: user
        };
        sendJson(res, 200, responseData);
    }
    catch (error) {
        console.error('Error fetching user posts:', error);
        sendJson(res, 500, { error: 'Failed to fetch user posts' });
    }
}