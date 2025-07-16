import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../generated/prisma";

const connectionString = `${process.env.DATABASE_URL}`;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({ connectionString });
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
