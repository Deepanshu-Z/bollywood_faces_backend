import { Hono } from "hono";
import db from "../../db/db.js";
import { forms } from "../../db/schema.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const getAllForms = new Hono();

getAllForms.use(authMiddleware);
getAllForms.get("/allforms", async (c) => {
  try {
    const response = await db.select().from(forms);
    console.log(response);
    return c.json(response);
  } catch (error) {
    console.log("error getting forms");
  }
});

export default getAllForms;
