import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the test database");
    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
})();