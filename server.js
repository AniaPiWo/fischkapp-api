import express from 'express';
import colors from "colors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./modules/helpers/config.js";

dotenv.config();

const app = express()

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000; 
app.listen(port, async () => {
    console.log(colors.magenta(`Server is live, running on port: ${port}`));

    try {
        console.log(colors.green(`Connecting to MongoDB...`));
        await mongoose.connect(config.MONGODB_URI, {
            dbName: 'fishkaap'
        })
        console.log(colors.green("Database connection successful!"));
    } catch (error) {
        console.log(colors.red("Error connecting to MongoDB:", error.message));
        process.exit(1);
    }
});
