import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const userPassword = await bcrypt.hash("test123", 10)

  await prisma.user.create({
    data: {
      email: "algoritmskiy@gmail.com",
      phone: "+998909033136",
      isOAuth: false,
      password: userPassword,
      phone_verified: true,
      language: "uz",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    // eslint-disable-next-line no-undef
    process.exit(1)
  })

