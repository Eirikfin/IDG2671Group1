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
export const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // getting the token from authorization (removing "Bearer ")

    if (!token) {
      //if no token was provided
      return res
        .status(401)
        .json({ message: "Access denied. No token was provided." });
    }
    //decode the token
    const decodedToken = jwt.verify(token, secretKey);
    //set user to the payload of decoded token
    req.user = decodedToken;

    next(); //move on to next middleware
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Token has expired, or is invalid." });
  }
};
