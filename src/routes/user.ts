import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", (c) => {
  console.log("Printing our users: ");
  return c.text("1");
});

export default userRouter;
