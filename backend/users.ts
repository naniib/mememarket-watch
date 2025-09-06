// FIX: Import Request and Response for correct typing.
// FIX: Use express.Request and express.Response to prevent conflicts with global types.
// FIX: Import Request and Response directly from express to avoid type conflicts.
// FIX: Use default import for express to avoid type conflicts with global Request/Response.
// FIX: Import Request and Response from express to resolve type errors.
// FIX: Use only the default import for express to avoid type conflicts.
// FIX: Switched to default express import to resolve type errors.
// FIX: Use named imports for express types to resolve conflicts with global types.
// FIX: Switched to default express import to resolve type errors and conflicts with global types.
// FIX: Correctly import Request and Response types from express.
import express from 'express';
import { pool } from './db.js';

// Helper function to safely send JSON responses
// FIX: Use express.Response type to access .status() method.
// FIX: Used express.Response to fix error on res.status.
// FIX: Use express.Response to resolve missing 'status' property error.
// FIX: Use Response type from express to resolve property 'status' not existing.
function sendJson(res: express.Response, statusCode: number, data: any) {
  res.status(statusCode).json(JSON.parse(JSON.stringify(data)));
}

// Define interfaces for type casting
interface UserPayload {
  userId: number;
  email: string;
}

// FIX: Extend express.Request for correct typing.
interface AuthenticatedRequest extends express.Request {
  user?: UserPayload;
}

// Update a user's profile
// FIX: Use express.Request and express.Response for correct typing.
// FIX: Use express.Request to access 'params' and 'body' properties.
// FIX: Use Request and Response types from express to access 'params' and 'body' properties.
export async function updateUser(req: express.Request, res: express.Response) {
    try {
        const { userId } = req.params;
        const { username, email } = req.body;
        const loggedInUser = (req as AuthenticatedRequest).user;

        if (!loggedInUser || loggedInUser.userId !== parseInt(userId)) {
            return sendJson(res, 403, { error: 'Forbidden: You can only update your own profile.' });
        }

        // Validate input
        if (!username || !email) {
            return sendJson(res, 400, { error: 'Username and email are required.' });
        }
        if (username.length < 3) {
            return sendJson(res, 400, { error: 'Username must be at least 3 characters long.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return sendJson(res, 400, { error: 'Invalid email format.' });
        }

        // Check if username or email is already taken by another user
        const conflictQuery = `
            SELECT id FROM users 
            WHERE (username = $1 OR email = $2) AND id != $3
        `;
        const conflictResult = await pool.query(conflictQuery, [username, email, loggedInUser.userId]);
        if (conflictResult.rows.length > 0) {
            return sendJson(res, 409, { error: 'Username or email is already in use by another account.' });
        }
        
        // Update user in the database
        const updateUserQuery = `
            UPDATE users
            SET username = $1, email = $2
            WHERE id = $3
            RETURNING id, username, email, created_at
        `;
        const updatedUserResult = await pool.query(updateUserQuery, [username, email, loggedInUser.userId]);
        const updatedUser = updatedUserResult.rows[0];

        sendJson(res, 200, {
            success: true,
            user: updatedUser,
        });

    } catch (error) {
        console.error('Error updating user profile:', error);
        sendJson(res, 500, { error: 'Failed to update user profile.' });
    }
}