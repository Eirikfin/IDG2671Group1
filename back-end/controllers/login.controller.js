import Researcher from "../models/researchers.model.js";
import { createToken } from "../middleware/webtoken.js";
import { comparePassword } from "../middleware/passwordhandling.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "topsecretkey";

export const logIn = async (req, res) => {
  try {
    const username = req.body.email; //provided email address
    const password = req.body.password; //provided password
    const foundUser = await Researcher.findOne({ email: username }); //find object with right email in database
    if (!foundUser) {
      //if no user was found
      return res
        .status(404)
        .json({ message: "No researcher with provided email was found" });
    }
    if (await comparePassword(password, foundUser.password)) {
      //compare password-input with password in database
      //if they match, the user logs inn!

      //payload for info stored in token
      const payload = {
        username: foundUser.name,
        id: foundUser._id,
        role: foundUser.role,
      };

      //generated a jwt token
      const token = await createToken(payload, secretKey);

      res.cookie("researcherId", foundUser._id, {
        httpOnly: true,
        secure: process.env.NODE_env === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //Cookie expires in 24hr
      });

      //send success massage and jwt token to client:
      return res.status(200).json({
        message: "Log in was successful",
        token: token,
        id: foundUser._id,
      });
    } else {
      return res.status(400).json({ message: "Wrong password." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};