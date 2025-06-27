import app from "#app";
import db from "#db/client";
import express from "express";
const PORT = process.env.PORT ?? 3000;
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./db/queries/employees.js";
await db.connect();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

app.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", validateId, async (req, res, next) => {
  try {
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("Employee not found.");
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

app.post("/employees", async (req, res, next) => {
  const { name, birthdate, salary } = req.body;
  if (!req.body) return res.status(400).send("Request must have a body.");
  if (!name || !birthdate || !salary)
    return res.status(400).send("Missing required field(s).");

  try {
    const newEmp = await createEmployee(name, birthdate, salary);
    res.status(201).json(newEmp);
  } catch (err) {
    next(err);
  }
});

app.put("/employees/:id", validateId, async (req, res, next) => {
  const { name, birthdate, salary } = req.body;
  if (!req.body) return res.status(400).send("Request must have a body.");
  if (!name || !birthdate || !salary)
    return res.status(400).send("Missing required field(s).");

  try {
    const updatedEmp = await updateEmployee(req.id, {
      name,
      birthdate,
      salary,
    });

    if (!updatedEmp) return res.status(404).send("Employee not found.");
    res.status(200).json(updatedEmp);
  } catch (err) {
    next(err);
  }
});

app.delete("/employees/:id", validateId, async (req, res, next) => {
  try {
    const deleted = await deleteEmployee(req.id);
    if (!deleted) return res.status(404).send("Employee not found.");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something Broke");
});
