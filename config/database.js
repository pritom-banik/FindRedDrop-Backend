
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


let db = null;
let isConnected = false;

async function connectDB() {
    try {
        // Prevent reconnecting on every Vercel function call
        if (isConnected && db) {
            return db;
        }

        await client.connect();
        db = client.db(process.env.DATABASE_NAME);
        //await db.command({ ping: 1 });
        console.log("MongoDB connected successfully");
        isConnected = true;

        return db;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        // REMOVING THIS IN VERCEL
        // process.exit(1);

        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return db;
}


module.exports = { getDb, connectDB };