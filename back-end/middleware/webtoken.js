import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Researcher from "../models/researchers.model.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "topsecretkey";

//creating a token:
export const createToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
  return token;
};

//authenticating a token:
// filepath: /Users/hannasamborska/Documents/GitHub/IDG2671Group1/back-end/middleware/webtoken.js

// filepath: /Users/hannasamborska/Documents/GitHub/IDG2671Group1/back-end/middleware/webtoken.js

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Allow mock token for testing
  if (token === "mock-token-for-testing") {
      req.user = { id: "mock-user-id", role: "researcher" }; // Mock user data
      return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
  });
};