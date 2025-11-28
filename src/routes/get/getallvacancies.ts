import { Hono } from "hono";
import db from "../../db/db.js";
import { schema } from "../../db/schema.js";

const getallvacancies = new Hono();

getallvacancies.get("/", async (c) => {
  try {
    const response = await db.select().from(schema.vacancies);
    console.log(response);
    return c.json({ data: response, message: "Success" }, 200);
  } catch (error) {
    return c.json({ message: "error fetching vacancies", error }, 400);
  }
});

export default getallvacancies;
