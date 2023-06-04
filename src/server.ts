const express, { Request, Response } = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { config } = require('./config');

const app = express();
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

const port = 3000;
app.listen(port, async () => {
  console.log(colors.magenta(`Server is live, running on port: ${port}`));

  try {
    console.log(colors.green(`Connecting to MongoDB...`));
    await mongoose.connect(config.MONGODB_URI, {
      dbName: 'fishkaap',
    });
    console.log(colors.green('Database connection successful!'));
  } catch (error) {
    console.log(colors.red('Error connecting to MongoDB'));
    process.exit(1);
  }
});