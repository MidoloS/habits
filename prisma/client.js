import { PrismaClient } from "@prisma/client";

/** @returns {PrismaClient<PrismaClientOptions, never>} */
export const generatePrismaClient = () => {
  if (!global.prisma) {
    let pclient = new PrismaClient();
    global.prisma = pclient;
  }
  return global.prisma;
};
