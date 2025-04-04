import bcrypt from "bcrypt";

//hashing password before submitting to database:
export const passwordHash = async (req, res, next) => {
  try {
    if (!req.body.password) {
      //if no password is provided
      return res.status(400).json({ message: "Password is required" });
    }

    const saltRounds = 10; // number of times passwords is encrypted/salted
    req.body.password = await bcrypt.hash(req.body.password, saltRounds); //updates the usersubmitted password with the new encrypted password

    next(); //moves on to next middleware
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error hashing password", error: err.message });
  }
};

//compare submitted password with password in database:
export const comparePassword = async (inputPassword, databasePassword) => {
  try {
    return await bcrypt.compare(inputPassword, databasePassword);
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};
