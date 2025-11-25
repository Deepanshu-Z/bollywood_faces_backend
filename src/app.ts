import { Hono } from "hono";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import "dotenv/config";
import useForm from "./routes/postForms.js";
import getAllForms from "./routes/getAllForms.js";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";

const app = new Hono({
  strict: false,
});
app.use("*", logger());

app.get("/", (c) => {
  console.log("Hey I am running");
  return c.text("Hey");
});

app.route("/api/users", userRouter);

app.basePath("/api").route("/", authRouter);

app.route("/api/submit", useForm);
app.route("/api/get", getAllForms);
export default app;
