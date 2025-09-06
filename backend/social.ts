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

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

// Toggle like on a post
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function toggleLike(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        // FIX: Cast request to AuthenticatedRequest to access the user property.
        const userId = (req as AuthenticatedRequest).user!.userId;
        const postIdNumber = parseInt(postId);
        // Validate postId
        if (isNaN(postIdNumber)) {
            return sendJson(res, 400, { error: 'Invalid post ID' });
        }
        // Check if post exists
        const postQuery = `SELECT id FROM posts WHERE id = $1`;
        const postResult = await pool.query(postQuery, [postIdNumber]);
        if (postResult.rows.length === 0) {
            return sendJson(res, 404, { error: 'Post not found' });
        }
        // Check if user already liked this post
        const existingLikeQuery = `
      SELECT id FROM likes 
      WHERE user_id = $1 AND post_id = $2
    `;
        const existingLikeResult = await pool.query(existingLikeQuery, [userId, postIdNumber]);
        let liked = false;

        if (existingLikeResult.rows.length > 0) {
            // Unlike the post
            const deleteLikeQuery = `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`;
            await pool.query(deleteLikeQuery, [userId, postIdNumber]);
            liked = false;
        }
        else {
            // Like the post
            const insertLikeQuery = `
        INSERT INTO likes (user_id, post_id, created_at)
        VALUES ($1, $2, NOW())
      `;
            await pool.query(insertLikeQuery, [userId, postIdNumber]);
            liked = true;
            // Award fidelity points to the post author (+5 points)
            const getPostAuthorQuery = `SELECT user_id FROM posts WHERE id = $1`;
            const postAuthorResult = await pool.query(getPostAuthorQuery, [postIdNumber]);
            if (postAuthorResult.rows.length > 0) {
                const postAuthorId = postAuthorResult.rows[0].user_id;
                await updateFidelityPoints(postAuthorId, 5);
            }
        }
        // Get updated like count
        const likeCountQuery = `SELECT COUNT(*) as count FROM likes WHERE post_id = $1`;
        const likeCountResult = await pool.query(likeCountQuery, [postIdNumber]);
        const likeCount = parseInt(likeCountResult.rows[0].count);
        
        const responseData = {
            success: true,
            liked: liked,
            likeCount: likeCount
        };
        
        sendJson(res, 200, responseData);
    }
    catch (error) {
        console.error('Error toggling like:', error);
        sendJson(res, 500, { error: 'Failed to toggle like' });
    }
}

// Get all comments for a post
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function getComments(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        const postIdNumber = parseInt(postId);
        // Validate postId
        if (isNaN(postIdNumber)) {
            return sendJson(res, 400, { error: 'Invalid post ID' });
        }
        // Check if post exists
        const postQuery = `SELECT id FROM posts WHERE id = $1`;
        const postResult = await pool.query(postQuery, [postIdNumber]);
        if (postResult.rows.length === 0) {
            return sendJson(res, 404, { error: 'Post not found' });
        }
        // Get all comments for the post
        const commentsQuery = `
      SELECT 
        c.id, 
        c.text, 
        c.created_at,
        u.id as user_id,
        u.username,
        u.email
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
    `;
        const commentsResult = await pool.query(commentsQuery, [postIdNumber]);
        // Format comments with user info
        const comments = commentsResult.rows.map(row => ({
            id: row.id,
            text: row.text,
            createdAt: row.created_at,
            user: {
                id: row.user_id,
                username: row.username,
                email: row.email
            }
        }));

        const responseData = {
            success: true,
            comments: comments
        };
        
        sendJson(res, 200, responseData);
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        sendJson(res, 500, { error: 'Failed to fetch comments' });
    }
}

// Add a new comment to a post
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function addComment(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        // FIX: Cast request to AuthenticatedRequest to access the user property.
        const userId = (req as AuthenticatedRequest).user!.userId;
        const postIdNumber = parseInt(postId);
        // Validate postId
        if (isNaN(postIdNumber)) {
            return sendJson(res, 400, { error: 'Invalid post ID' });
        }
        // Validate comment text
        if (!text || text.trim().length === 0) {
            return sendJson(res, 400, { error: 'Comment text is required' });
        }
        // Check if post exists
        const postQuery = `SELECT id FROM posts WHERE id = $1`;
        const postResult = await pool.query(postQuery, [postIdNumber]);
        if (postResult.rows.length === 0) {
            return sendJson(res, 404, { error: 'Post not found' });
        }
        // Create new comment
        const insertCommentQuery = `
      INSERT INTO comments (text, user_id, post_id, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, text, user_id, post_id, created_at
    `;
        const newCommentResult = await pool.query(insertCommentQuery, [text.trim(), userId, postIdNumber]);
        const newComment = newCommentResult.rows[0];
        // Award fidelity points for commenting (+2 points)
        await updateFidelityPoints(userId, 2);
        // Get user info for the response
        const getUserQuery = `
      SELECT id, username, email FROM users WHERE id = $1
    `;
        const userResult = await pool.query(getUserQuery, [userId]);
        const user = userResult.rows[0];

        const responseData = {
            success: true,
            comment: {
                id: newComment.id,
                text: newComment.text,
                createdAt: newComment.created_at,
                user: user
            }
        };
        
        sendJson(res, 201, responseData);
    }
    catch (error) {
        console.error('Error adding comment:', error);
        sendJson(res, 500, { error: 'Failed to add comment' });
    }
}

// Increment share count for a post
// FIX: Use express.Request and express.Response types for compatibility with Express handlers.
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use Request and Response types from express import.
// FIX: Use Request and Response types from express.
export async function sharePost(req: Request, res: Response) {
    try {
        const { postId } = req.params;
        const postIdNumber = parseInt(postId);
        // Validate postId
        if (isNaN(postIdNumber)) {
            return sendJson(res, 400, { error: 'Invalid post ID' });
        }
        // Check if post exists and increment share count
        const updateShareQuery = `
      UPDATE posts 
      SET share_count = share_count + 1 
      WHERE id = $1 
      RETURNING id, share_count
    `;
        const updateResult = await pool.query(updateShareQuery, [postIdNumber]);
        if (updateResult.rows.length === 0) {
            return sendJson(res, 404, { error: 'Post not found' });
        }
        const updatedPost = updateResult.rows[0];
        
        const responseData = {
            success: true,
            shareCount: updatedPost.share_count
        };
        
        sendJson(res, 200, responseData);
    }
    catch (error) {
        console.error('Error sharing post:', error);
        sendJson(res, 500, { error: 'Failed to share post' });
    }
}