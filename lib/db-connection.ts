import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  try {
    // Check if we already have a connection
    if (cached.conn) {
      if (cached.conn.connection.readyState === 1) {
        return cached.conn;
      }
      // If connection is not ready, close it and reconnect
      await cached.conn.disconnect();
      cached.conn = null;
      cached.promise = null;
    }

    if (!cached.promise) {
      const opts: mongoose.ConnectOptions = {
        bufferCommands: false,
        maxPoolSize: 10,
        minPoolSize: 5,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 10000,
        heartbeatFrequencyMS: 5000,
        retryWrites: true,
        autoIndex: true,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts);
    }

    cached.conn = await cached.promise;

    // Handle connection errors
    cached.conn.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      cached.conn = null;
      cached.promise = null;
    });

    // Handle disconnection
    cached.conn.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      cached.conn = null;
      cached.promise = null;
    });

    // Gracefully handle process termination
    process.on('SIGINT', async () => {
      if (cached.conn) {
        await cached.conn.disconnect();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      }
    });

    return cached.conn;
  } catch (error) {
    console.error('Database connection error:', error);
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}
