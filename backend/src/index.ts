import "module-alias/register";
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { onRequest } from "firebase-functions/v2/https";
import * as apis from "./endpoints";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/employees", apis.employeesRouter);
app.use("/generate-token", apis.generateAccessTokenRoute);

app.use("/test", (req, res) => {
  res.send({
    message: "Test Data",
    data: [{ id: 1, name: "Test User" }],
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Express server is running on http://localhost:${process.env.PORT}`
  );
});

const api = onRequest(app);

export { app, api };
