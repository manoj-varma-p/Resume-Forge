require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

/** @type {typeof globalThis & { prisma?: import('@prisma/client').PrismaClient }} */
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = prisma;
