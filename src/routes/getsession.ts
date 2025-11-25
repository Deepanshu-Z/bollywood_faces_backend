import { Hono } from "hono";
import { auth } from "../lib/auth.js";

const getsession = new Hono();

getsession.get("/getsession", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  return c.json({ session });
});

export default getsession;
