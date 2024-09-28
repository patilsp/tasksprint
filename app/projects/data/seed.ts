import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { emails, phones, statuses } from "./data"

const projects = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  description: faker.helpers.arrayElement(description).value,
  startDate: faker.helpers.arrayElement(startDate).value,
  endDate: faker.helpers.arrayElement(endDate).value,
  status: faker.helpers.arrayElement(status).value,
  assignedTo: faker.helpers.arrayElement(assignedTo).value,
}))

fs.writeFileSync(
  path.join(__dirname, "projects.json"),
  JSON.stringify(projects, null, 2)
)

console.log("✅ projects data generated.")
