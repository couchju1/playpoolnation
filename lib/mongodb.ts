import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

// Extend globalThis to hold the cached connection during dev
declare global {
  interface GlobalThis {
    _mongoClientPromise?: Promise<MongoClient>;
  }
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error: global._mongoClientPromise is not typed
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    // @ts-expect-error: assigning to undeclared global prop
    global._mongoClientPromise = client.connect();
  }
  // @ts-expect-error: reading undeclared global prop
  clientPromise = global._mongoClientPromise;
} else {
  // Always create a new client in production
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;










