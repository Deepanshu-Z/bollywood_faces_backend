import { Hono } from "hono";
import db from "../../db/db.js";
import { vacancies } from "../../db/schema.js";
import { eq } from "drizzle-orm";

const deletevacancies = new Hono();

export default deletevacancies.delete("/", async (c) => {
  try {
    const { vacancieId } = await c.req.json();

    if (!vacancieId) return c.json({ message: "Please provide vacancy ID" });

    const response = await db
      .delete(vacancies)
      .where(eq(vacancies.id, vacancieId));

    return c.json({ message: "Vacancie deleted successfully", response });
  } catch (error) {
    return c.json({ message: "error deleting vacancies", error });
  }
});
