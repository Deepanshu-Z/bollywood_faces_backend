import { Hono } from "hono";
import db from "../db/db.js";
import { forms } from "../db/schema.js";

const useForm = new Hono();

useForm.post("/submitforms", async (c) => {
  const { id, username, email, content } = await c.req.json();

  try {
    const response = await db.insert(forms).values({
      id,
      username,
      email,
      content,
    });
    console.log(response.fields);
    return c.text("Submit your forms");
  } catch (error) {
    console.log("error sending form", error);
  }
});

export default useForm;
