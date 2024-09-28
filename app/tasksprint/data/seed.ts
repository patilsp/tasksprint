import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

const priorities = ['Low', 'Medium', 'High']; // Define possible priorities

const tasks = Array.from({ length: 100 }, () => ({
  id: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
  name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
  description: faker.lorem.sentences(2),
  startDate: faker.date.past(),
  dueDate: faker.date.future(),
  priority: faker.helpers.arrayElement(priorities),
  projectId: faker.datatype.number({ min: 1, max: 10 }).toString(),
  assignedTo: faker.datatype.number({ min: 1, max: 10 }).toString(),
}));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Task data generated.");
