import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";
async function seedEmployees() {
  // TODO
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
  await createEmployee(faker.person.fullName(), faker.date.birthdate(), 10000);
}
