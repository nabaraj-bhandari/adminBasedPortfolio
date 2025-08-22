import { connectToDatabase } from './db-connection';

export async function cleanupServerResources() {
  try {
    // Get the mongoose instance
    const mongoose = await connectToDatabase();
    
    // Close all database connections
    if (mongoose) {
      await mongoose.connection.close();
    }

    // Clean up any remaining event listeners
    process.removeAllListeners('SIGINT');
    process.removeAllListeners('SIGTERM');
    
    return true;
  } catch (error) {
    console.error('Error during cleanup:', error);
    return false;
  }
}

// Register cleanup handlers
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Cleaning up...`);
    await cleanupServerResources();
    process.exit(0);
  });
});
