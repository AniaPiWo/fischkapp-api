const dotenv = require('dotenv');

dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
};
