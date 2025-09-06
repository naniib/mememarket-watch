// FIX: Added a triple-slash directive to provide Node.js type definitions to TypeScript, which resolves the error on `process.exit` by correctly typing the global `process` object.
/// <reference types="node" />
// FIX: Removed `/// <reference types="node" />` as it was causing a "Cannot find type definition file for 'node'" error.
import pg from 'pg';
// FIX: Removed the explicit `process` import as it caused a type conflict.
// Relying on the global `process` object (used in other files) resolves the `process.exit` type error.

// Configuration for the database connection.
// It's recommended to use environment variables for sensitive data in production.
const dbConfig = {
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mememarket',
  password: process.env.DB_PASSWORD || 'password',
  port: Number(process.env.DB_PORT) || 5432,
};

// Create a new connection pool.
// The pool manages multiple client connections and is the preferred way
// to interact with the database in a Node.js application.
export const pool = new pg.Pool(dbConfig);

// Optional: Add a listener for connection errors on the pool
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // FIX: Use `process.exit` which is available as a global in Node.js.
  process.exit(-1);
});

console.log('PostgreSQL connection pool configured.');