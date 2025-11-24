import { Hono } from "hono";
import { auth } from "../../lib/auth.js";

const authRouter = new Hono();

authRouter
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .get("/", (c) => {
    return c.text("hi");
  });

authRouter.get("/check", (c) => {
  return c.text("auth running");
});
export default authRouter;
