import { MongoClient, Database } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  client.connectWithUri("mongodb://localhost:27017");

  db = client.database("test-deno");
}

export function getDb() {
  return db;
}

// Defining schema interface
export interface TodoSchema {
  _id: { $oid: string };
  text: string;
};
