// lib/db.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Augment NodeJS.Global type
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Prevents re-initialization in dev
const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectToDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "BIZHUB_DB",
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected");
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
