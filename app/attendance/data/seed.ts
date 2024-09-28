import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { statuses } from "./data"

const leaves = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  employeeName: faker.name.fullName(),
  leaveType: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  startDate: faker.date.recent(),
  endDate: faker.date.recent(),
  status: faker.helpers.arrayElement(statuses).value,
  days: faker.datatype.number({ min: 1, max: 30 }),
  reason: faker.reason.sentence(),
}))

fs.writeFileSync(
  path.join(__dirname, "leaves.json"),
  JSON.stringify(leaves, null, 2)
)

console.log("✅ leaves data generated.")
