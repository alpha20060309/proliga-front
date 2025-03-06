import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const userPassword = await bcrypt.hash("iuser123!", 10)

  // creating a user

  await prisma.user.create({
    data: {
      name: "John",
      last_name: "Doe",
      middle_name: "A.",
      email: "john.dsoe@example.com",
      phone: "+99872342178734",
      gender: "Male",
      isOAuth: false,
      password: userPassword,
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

