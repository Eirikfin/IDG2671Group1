import {describe, it, before, after } from "node:test";
import assert from "node:assert";
import nock from "nock";
import Researcher from "../models/researchers.model.js";
import researcherValidator from "../../validators/researcher.validator.js";
import dbConnect from "../db.js"
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();



before(async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/integration_testing", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const researcherData = {
            email: "testmail@hotmail.com",
            password: "Hunter12"
        };

        // Validate researcher data
        await researcherValidator(researcherData);

        // Create and save the new researcher
        const newResearcher = new Researcher(researcherData);
        await newResearcher.save();

    } catch (error) {
        console.error("Error in before() setup:", error);
    }
});



after(() => {
    mongoose.connection.close();
});
