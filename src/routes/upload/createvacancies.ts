import { Hono } from "hono";
import db from "../../db/db.js";
import { schema } from "../../db/schema.js";

const createvacancies = new Hono();

createvacancies.post("/", async (c) => {
  try {
    const { title, description, image, location, experienceYears } =
      await c.req.json();
    const [response] = await db
      .insert(schema.vacancies)
      .values({
        title,
        description,
        image,
        location,
        experienceYears,
      })
      .returning();

    return c.json({ response });
  } catch (error) {
    console.log(error);
    return c.json({ error }, 500);
  }
});

export default createvacancies;
