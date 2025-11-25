import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import db from "../db/db.js";
import { schema } from "../db/schema.js";
import { eq } from "drizzle-orm";

type middle = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const authMiddleware = createMiddleware<middle>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: "Unauthorized" }, 404);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  const findUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, session?.user.email!));

  const role = findUser[0].role;

  if (role == "user") return c.json({ error: "No access to this page" }, 404);
  await next();
});

export default authMiddleware;
