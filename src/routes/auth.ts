import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import db from "../db/db.js";
import { schema } from "../db/schema.js";
import { eq } from "drizzle-orm";

const authRouter = new Hono();

authRouter
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .get("/", async (c) => {
    return c.text("hi");
  });

authRouter.get("/check", (c) => {
  return c.text("auth running");
});

export default authRouter;
