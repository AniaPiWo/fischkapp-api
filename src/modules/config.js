import dotenv from "dotenv";

dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
};

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
export const corsOptions = {
  origin: function (origin, callback) {
    if (origin === ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader === "pss-this-is-my-secret") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
