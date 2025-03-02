import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Hash passwords
  const userPassword = await bcrypt.hash("iuser123!", 10)

  // Create admin user
  // Create regular user
  const regularUser = await prisma.user.insert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      name: "John",
      last_name: "Doe",
      middle_name: "A.",
      email: "john.doe@example.com",
      phone: "+998770178734",
      gender: "Male",
      birth_date: new Date("2000-01-01"),
      bio: "Software developer",
      balance: 100.0,
      enable_notification: true,
      phone_verified: false,
      is_test: false,
      isOAuth: false,
      password: userPassword,
      role: "user",
      language: "uz",
      created_at: new Date(),
      updated_at: new Date(),
    },
  })
  const user = await prisma.user.insert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      name: "John",
      last_name: "Doe",
      middle_name: "A.",
      email: "john.doe@example.com",
      phone: "+998770178734",
      gender: "Male",
      birth_date: new Date("2000-01-01"),
      bio: "Software developer",
      balance: 100.0,
      enable_notification: true,
      phone_verified: false,
      is_test: false,
      isOAuth: false,
      password: userPassword,
      role: "user",
      language: "uz",
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  console.log(regularUser, user)


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

