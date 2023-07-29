import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { api } from "./api.js";
import { config } from "./modules/config.js";
import cors from "cors";

dotenv.config();
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const corsOptions = {
  origin: function (origin, callback) {
    if (origin === ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(cors(corsOptions));
app.use("/", api);

app.use("/", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send("Hello, World!");
});

const port = 4000;
app.listen(port, async () => {
  console.log(colors.magenta(`CORS-enabled server, running on port: ${port}`));

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
