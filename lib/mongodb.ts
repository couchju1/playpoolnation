import { MongoClient } from 'mongodb';
console.log('🔎 MONGODB_URI:', process.env.MONGODB_URI);
const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global `var` declarations for hot reload in development
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In dev, use a global variable so the value is preserved across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In production, no need to store globally
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

