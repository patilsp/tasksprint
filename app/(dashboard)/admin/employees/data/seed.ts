import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { emails, phones, statuses } from "./data"

const employees = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  firstName: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  lastName: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  email: faker.helpers.arrayElement(emails).value,
  phone: faker.helpers.arrayElement(phones).value,
  department: faker.helpers.arrayElement(department).value,
  jobTitle: faker.helpers.arrayElement(jobTitle).value,
  status: faker.helpers.arrayElement(statuses).value,
  image: faker.image.avatar(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  role: faker.helpers.arrayElement(roles).value,
  salary: faker.salary(),
}))

fs.writeFileSync(
  path.join(__dirname, "employees.json"),
  JSON.stringify(employees, null, 2)
)

console.log("✅ projects data generated.")
