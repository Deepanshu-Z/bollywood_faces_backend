import { Hono } from "hono";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth/auth.js";
import "dotenv/config";
import useForm from "./routes/postForms.js";
import getAllForms from "./routes/getAllForms.js";

const app = new Hono({
  strict: false,
});

app.get("/", (c) => {
  console.log("Hey I am running");
  return c.text("Hey");
});

app.route("/api", userRouter);

app.basePath("/api").route("/", authRouter);

app.route("/api", useForm);

app.route("/api", getAllForms);
export default app;
