import { Hono } from "hono";
import db from "../db/db.js";
import { forms } from "../db/schema.js";

const getAllForms = new Hono();

getAllForms.get("/getallforms", async (c) => {
  try {
    const response = await db.select().from(forms);
    console.log(response);
  } catch (error) {
    console.log("error getting forms");
  }
  return c.text("Hit me!");
});

export default getAllForms;
