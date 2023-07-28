import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { api } from "./api.js";
import { config } from "./modules/config.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();

app.use("/", api);

app.use((req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send("Hello, World!");
});

const port = 4000;
app.listen(port, async () => {
  console.log(colors.magenta(`Server is live, running on port: ${port}`));

  try {
    console.log(colors.green(`Connecting to MongoDB...`));
    await mongoose.connect(config.MONGODB_URI, {
      dbName: "fishkapp",
    });
    console.log(colors.green("Database connection successful!"));
  } catch (error) {
    console.log(colors.red("Error connecting to MongoDB"));
    process.exit(1);
  }
});
