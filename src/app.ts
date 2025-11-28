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
import updateuser from "./routes/upload/editprofile.js";
import editprofile from "./routes/upload/editprofile.js";
const app = new Hono({
  strict: false,
});
app.use("*", logger());

app.get("/", (c) => {
  console.log("Hey I am running");
  return c.text("Hey");
});
app.route("/api", authRouter);
app.route("/api/users", userRouter);
app.route("/api/forms", useForm);
app.route("/api/files", uploadfile);
app.route("/api/updateuser", editprofile);
app.route("/api/vacancies", createvacancies);
app.route("/api/forms/all", getAllForms);
app.route("/api/vacancies/all", getallvacancies);

export default app;
