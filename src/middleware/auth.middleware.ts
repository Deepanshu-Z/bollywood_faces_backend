import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

type middle = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const authMiddleware = createMiddleware<middle>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

export default authMiddleware;
