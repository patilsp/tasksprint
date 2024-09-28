import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { emails, phones, statuses } from "./data"

const users = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  email: faker.helpers.arrayElement(emails).value,
}))

fs.writeFileSync(
  path.join(__dirname, "users.json"),
  JSON.stringify(users, null, 2)
)

console.log("✅ users data generated.")
