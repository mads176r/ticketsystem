import { PrismaClient } from "@prisma/client";

// Declare a global variable for caching the Prisma Client instance
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

// Initialize Prisma Client based on the environment
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

// Export the Prisma Client instance
export const db = prisma;
