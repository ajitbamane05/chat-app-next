import { PrismaClient } from "@prisma/client";

let db;

//check if we are running in production mode
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export default db;
