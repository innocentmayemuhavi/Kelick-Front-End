import "module-alias/register";
import cors from "cors";
import express from "express";
import * as apis from "./endpoints";
import dotenv from "dotenv";

import { onRequest } from "firebase-functions/v2/https";
import session from "express-session";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

console.log(process.env.JWT_SECRET);
app.use("/employees", apis.employeesRouter);
app.use("/auth", apis.authRouter);
app.listen(process.env.PORT, () => {
  console.log(
    `Express server is running on http://localhost:${process.env.PORT}`
  );
});
const api = onRequest(app);

export { api };
