
// FIX: Import Request, Response, and NextFunction from express to resolve type errors.
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import { supabase, STORAGE_BUCKET } from './supabase.js';
import { registerUser, loginUser } from './auth.js';
// FIX: Pass route handlers directly to Express methods.
// FIX: Added exports for social interaction handlers to resolve import errors.
import { authenticateToken, createPost, getUserPosts } from './posts.js';
// FIX: Implement and export getComments, addComment, and sharePost in social.ts to resolve import errors.
import { toggleLike, getComments, addComment, sharePost } from './social.js';
import { authenticateToken as socialAuthenticateToken } from './social.js';
import { pool } from './db.js';
import { updateUser } from './users.js';

// FIX: Use Response type from express to resolve property 'status' not existing on type 'Response'.
function sendJson(res: Response, statusCode: number, data: any) {
  res.status(statusCode).json(JSON.parse(JSON.stringify(data)));
}

// Create Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Configure multer for file uploads (store in memory)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  // FIX: Corrected fileFilter callback to properly reject files with an error.
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      // FIX: To reject a file with an error, pass only the error object.
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Middleware to parse JSON
// FIX: Corrected types for error handling middleware to resolve this overload error.
app.use(express.json());

// Define port
const PORT = 3001;

// Health check route
// FIX: Use Request and Response types from express.
app.get('/', (req: Request, res: Response) => {
  sendJson(res, 200, { status: "ok" });
});

// Authentication routes
// FIX: Use Request type from express to access 'body' property.
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    
    // Validate required fields
    if (!email || !password || !username) {
      return sendJson(res, 400, { error: 'Email, password, and username are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendJson(res, 400, { error: 'Invalid email format' });
    }
    
    // Validate password length
    if (password.length < 6) {
      return sendJson(res, 400, { error: 'Password must be at least 6 characters long' });
    }
    
    // Validate username length
    if (username.length < 3) {
      return sendJson(res, 400, { error: 'Username must be at least 3 characters long' });
    }
    
    const result = await registerUser({ email, password, username });
    sendJson(res, 201, result);
  } catch (error) {
    console.error('Registration error:', error);
    sendJson(res, 400, { error: error instanceof Error ? error.message : 'Registration failed' });
  }
});

// FIX: Use Request type from express to access 'body' property.
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return sendJson(res, 400, { error: 'Email and password are required' });
    }
    
    const result = await loginUser({ email, password });
    sendJson(res, 200, result);
  } catch (error) {
    console.error('Login error:', error);
    sendJson(res, 401, { error: error instanceof Error ? error.message : 'Login failed' });
  }
});

// Posts routes
// FIX: Using correctly typed handlers resolves the overload error.
app.post('/api/posts', authenticateToken, createPost);
app.get('/api/users/:userId/posts', getUserPosts);
app.put('/api/users/:userId', authenticateToken, updateUser);

// Social interaction routes
app.post('/api/posts/:postId/like', socialAuthenticateToken, toggleLike);
app.get('/api/posts/:postId/comments', getComments);
app.post('/api/posts/:postId/comments', socialAuthenticateToken, addComment);
app.post('/api/posts/:postId/share', sharePost);

// File upload endpoint
// FIX: Use Request and Response types from express. The `file` property will be available on `req` due to multer's type augmentation.
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    // Check if Supabase is configured and available
    if (!supabase) {
      return sendJson(res, 503, { error: 'File upload service is not configured on the server.' });
    }

    if (!req.file) {
      return sendJson(res, 400, { error: 'No file provided' });
    }

    const file = req.file;
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return sendJson(res, 500, { 
        error: 'Failed to upload file to storage',
        details: error.message 
      });
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      return sendJson(res, 500, { 
        error: 'Failed to get public URL for uploaded file' 
      });
    }

    sendJson(res, 200, {
      success: true,
      data: {
        fileName: fileName,
        filePath: filePath,
        publicUrl: publicUrlData.publicUrl,
        fileSize: file.size,
        mimeType: file.mimetype
      }
    });

  } catch (error) {
    console.error('Upload endpoint error:', error);
    
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return sendJson(res, 400, { 
          error: 'File too large. Maximum size is 10MB.' 
        });
      }
    }
    
    sendJson(res, 500, { 
      error: 'Failed to upload file',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Chat endpoint - Get messages for a specific coin
// FIX: Use Request type from express to access 'params' property.
app.get('/api/chat/:coinId', async (req: Request, res: Response) => {
  try {
    const { coinId } = req.params;
    
    const query = `
      SELECT 
        m.id, 
        m.text, 
        m."userId", 
        m."coinId", 
        m."createdAt",
        u.username
      FROM "Message" m
      JOIN users u ON m."userId" = u.id
      WHERE m."coinId" = $1
      ORDER BY m."createdAt" ASC
    `;
    
    const result = await pool.query(query, [coinId]);
    sendJson(res, 200, result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    sendJson(res, 500, { error: 'Failed to fetch messages' });
  }
});

// Chat endpoint - Create a new message for a specific coin
// FIX: Use Request type from express to access 'params' and 'body' properties.
app.post('/api/chat/:coinId', async (req: Request, res: Response) => {
  try {
    const { coinId } = req.params;
    const { text, userId } = req.body;
    
    if (!text || !userId) {
        return sendJson(res, 400, { error: 'Text and userId are required' });
    }

    const query = `
      INSERT INTO "Message" (text, "userId", "coinId", "createdAt")
      VALUES ($1, $2, $3, NOW())
      RETURNING id, text, "userId", "coinId", "createdAt"
    `;
    
    const result = await pool.query(query, [text, userId, coinId]);
    sendJson(res, 201, result.rows[0]);
  } catch (error) {
    console.error('Error creating message:', error);
    sendJson(res, 500, { error: 'Failed to create message' });
  }
});

// Global error handler middleware to catch unhandled errors, including JSON parsing errors
// FIX: Use Request, Response, and NextFunction types from express.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);

  // Specifically handle JSON parsing errors from express.json()
  if (err instanceof SyntaxError && 'body' in err) {
    return sendJson(res, 400, { error: 'Invalid JSON format in request body' });
  }
  
  // Generic fallback for other unhandled errors
  sendJson(res, 500, { error: 'An internal server error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
