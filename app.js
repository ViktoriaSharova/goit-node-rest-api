import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
// import dotenv from 'dotenv';
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";


const { DB_HOST, PORT = 3000 } = process.env;

// dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});




mongoose.connect(process.env.DB_HOST)
 .then(()=> {
  app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
  });
 })
 .catch(error => {
  console.error(error.message);
  process.exit(1);
 })

 export default app;
