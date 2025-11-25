import { Hono } from "hono";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth/auth.js";
import "dotenv/config";
import useForm from "./routes/upload/postForms.js";
import getAllForms from "./routes/get/getAllForms.js";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import uploadfile from "./routes/upload/uploadfile.js";
import createvacancies from "./routes/upload/createvacancies.js";
import getallvacancies from "./routes/get/getallvacancies.js";
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

app.route("/upload/form", useForm);
app.route("/get/form", getAllForms);
app.route("/upload/file", uploadfile);
app.route("/upload/vacancies", createvacancies);
app.route("/get/vacancies", getallvacancies);

export default app;
