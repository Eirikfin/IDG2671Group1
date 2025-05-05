import { describe, it, before, after } from "mocha";
import assert from "assert";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Researcher from "../back-end/models/researchers.model.js";

dotenv.config();

describe("Integration Tests for Researchers API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Test database connected");

    // Drop the database to ensure a clean state
    await mongoose.connection.db.dropDatabase();

    // Rebuild indexes
    await Researcher.init();

    // Insert initial data
    const researcherData = {
      email: "testmail@hotmail.com",
      password: "Hunter12",
    };
    await Researcher.create(researcherData);
  });

  after(async () => {
    await mongoose.connection.close();
    console.log("Test database connection closed");
  });

  it("should fetch all researchers (positive case)", async () => {
    const researchers = await Researcher.find();
    assert.strictEqual(researchers.length, 1);
    assert.strictEqual(researchers[0].email, "testmail@hotmail.com");
  });

  it("should return an error for invalid researcher data (negative case)", async () => {
    try {
      await Researcher.create({ email: "invalid-email" }); // Missing password
    } catch (error) {
      assert.strictEqual(error.name, "ValidationError");
    }
  });

  it("should not allow duplicate researcher emails (negative case)", async () => {
    try {
      const duplicateResearcher = { email: "testmail@hotmail.com", password: "AnotherPass123" };
      await Researcher.create(duplicateResearcher);
    } catch (error) {
      assert.strictEqual(error.code, 11000); // MongoDB duplicate key error code
      return; // Exit the test after catching the error
    }
    throw new Error("Duplicate email was allowed, but it should not be.");
  });

  it("should update a researcher (positive case)", async () => {
    const researcher = await Researcher.findOne({ email: "testmail@hotmail.com" });
    researcher.name = "Updated Name";
    await researcher.save();

    const updatedResearcher = await Researcher.findById(researcher._id);
    assert.strictEqual(updatedResearcher.name, "Updated Name");
  });

  it("should delete a researcher (positive case)", async () => {
    const researcher = await Researcher.findOne({ email: "testmail@hotmail.com" });
    await Researcher.findByIdAndDelete(researcher._id);

    const deletedResearcher = await Researcher.findById(researcher._id);
    assert.strictEqual(deletedResearcher, null);
  });
});