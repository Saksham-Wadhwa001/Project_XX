import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: ['.env', '.env']});
declare global {
    var mongoose: any; // This tells TypeScript that 'mongoose' is a valid property on global
}
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) {
        console.log("MongoDB Connected");
        return cached.conn; // reuse existing connection
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;
    console.log("MongoDB Connected");
    return cached.conn;
}
// connectDB().then(()=> console.log("MongoDB Connected"));