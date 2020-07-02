const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query'],
})

const run = async () => {
  const d1 = await prisma.work.findMany()
  console.log({ d1 })

  const d2 = await prisma.user.findMany()
  console.log({ d2 })
}

run().finally(async () => {
  await prisma.disconnect()
})
