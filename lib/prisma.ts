// Prisma client singleton to avoid multiple instances in development
// Uses require to avoid TypeScript named-export resolution issues in some environments
// Use require and `any` to avoid compile-time named-export resolution issues
const pkg: any = require('@prisma/client')
const PrismaClient: any = pkg.PrismaClient || pkg.default?.PrismaClient || pkg.default || pkg

declare global {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  var __prisma: any
}

let prisma: any
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
  }
  prisma = global.__prisma
}

export default prisma
