import { Hono } from "hono";
import { auth } from "../../lib/auth.js";

const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

authRouter.get("/check", (c) => {
  return c.text("HI");
});
export default authRouter;
