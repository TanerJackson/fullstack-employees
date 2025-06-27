import client from "../client.js";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
  const text =
    "INSERT INTO employees(name, birthday, salary) VALUES($1, $2, $3) RETURNING *";
  const values = [name, birthday, salary];
  const res = await client.query(text, values);
  return res;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  const result = await client.query("SELECT * FROM employees");
  return result;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  try {
    const result = await db.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("undefined");
    throw error;
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
  try {
    const result = await db.query(
      `
      UPDATE employees
      SET name = $2,
          birthdate = $3,
          salary = $4
      WHERE id = $1
      RETURNING *;
      `
    );
    return result;
  } catch (error) {
    console.error("undefined");
    throw error;
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  try {
    const result = await db.query(
      `
      DELETE FROM employees
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    return result;
  } catch (error) {
    console.error("undefined");
    throw error;
  }
}
