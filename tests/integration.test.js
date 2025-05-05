import mongoose from "mongoose";
import { describe, it, before, after } from "mocha";
import assert from "assert";
import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

// Mock token middleware
app.use((req, res, next) => {
  req.user = { id: "mock-user-id", role: "admin" }; // Mock user for authorization
  next();
});

// Mock data
const questions = [];
const projects = [];
const sessions = [];

// Mock Questions API routes
app.get("/api/questions", (req, res) => {
  res.status(200).json({ questions });
});

app.post("/api/questions", (req, res) => {
  const newQuestion = { ...req.body, _id: new mongoose.Types.ObjectId().toString() };
  questions.push(newQuestion);
  res.status(201).json({ message: "Question created!", question: newQuestion });
});

app.put("/api/questions/:id", (req, res) => {
  const question = questions.find((q) => q._id === req.params.id);
  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }
  Object.assign(question, req.body);
  res.status(200).json({ message: "Question was updated", question });
});

app.delete("/api/questions/:id", (req, res) => {
  const index = questions.findIndex((q) => q._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Question not found" });
  }
  questions.splice(index, 1);
  res.status(200).json({ message: "Question was deleted!" });
});

// Mock Projects API routes
app.get("/api/projects", (req, res) => {
  res.status(200).json({ projects });
});

app.post("/api/projects", (req, res) => {
  const newProject = { ...req.body, _id: new mongoose.Types.ObjectId().toString() };
  projects.push(newProject);
  res.status(201).json({ message: "Project created!", project: newProject });
});

app.put("/api/projects/:id", (req, res) => {
  const project = projects.find((p) => p._id === req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  Object.assign(project, req.body);
  res.status(200).json({ message: "Project was updated", project });
});

app.delete("/api/projects/:id", (req, res) => {
  const index = projects.findIndex((p) => p._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }
  projects.splice(index, 1);
  res.status(200).json({ message: "Project was deleted!" });
});

// Mock Sessions API routes
app.get("/api/sessions", (req, res) => {
  res.status(200).json({ sessions });
});

app.post("/api/sessions", (req, res) => {
  const newSession = { ...req.body, _id: new mongoose.Types.ObjectId().toString() };
  sessions.push(newSession);
  res.status(201).json({ message: "Session created!", session: newSession });
});

app.put("/api/sessions/:id", (req, res) => {
  const session = sessions.find((s) => s._id === req.params.id);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }
  Object.assign(session, req.body);
  res.status(200).json({ message: "Session was updated", session });
});

app.delete("/api/sessions/:id", (req, res) => {
  const index = sessions.findIndex((s) => s._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Session not found" });
  }
  sessions.splice(index, 1);
  res.status(200).json({ message: "Session was deleted!" });
});

describe("Integration Tests for APIs", () => {
  let authToken;
  let testQuestionId;
  let testProjectId;
  let testSessionId;

  before(() => {
    // Mock token for testing
    authToken = "mock-token-for-testing";

    // Mock data setup
    testQuestionId = new mongoose.Types.ObjectId().toString();
    questions.push({
      _id: testQuestionId,
      projectId: "mock-project-id",
      researcherId: "mock-researcher-id",
      questionText: "Mock Question Text",
      typeOfQuestion: "MultipleChoice",
      questionAlternatives: ["Option 1", "Option 2"],
    });

    testProjectId = new mongoose.Types.ObjectId().toString();
    projects.push({
      _id: testProjectId,
      researcherId: "mock-researcher-id",
      title: "Mock Project Title",
      questions: [],
      status: "active",
    });

    testSessionId = new mongoose.Types.ObjectId().toString();
    sessions.push({
      _id: testSessionId,
      projectId: "mock-project-id",
      title: "Mock Session Title",
      description: "Mock Session Description",
      startTime: "2025-05-05T10:00:00Z",
      finishedTime: "2025-05-05T12:00:00Z",
    });
  });

  after(() => {
    questions.length = 0;
    projects.length = 0;
    sessions.length = 0;
  });

  describe("Questions API", () => {
    it("should fetch all questions", async () => {
      const response = await request(app)
        .get("/api/questions")
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert(Array.isArray(response.body.questions));
      assert.strictEqual(response.body.questions[0].questionText, "Mock Question Text");
    });

    it("should create a question", async () => {
      const response = await request(app)
        .post("/api/questions")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          projectId: "mock-project-id",
          researcherId: "mock-researcher-id",
          questionText: "New Question Text",
          typeOfQuestion: "TextInput",
          questionAlternatives: [],
        });
      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.message, "Question created!");
      assert.strictEqual(response.body.question.questionText, "New Question Text");
    });

    it("should update a question", async () => {
      const response = await request(app)
        .put(`/api/questions/${testQuestionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          questionText: "Updated Question Text",
        });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Question was updated");
      assert.strictEqual(response.body.question.questionText, "Updated Question Text");
    });

    it("should delete a question", async () => {
      const response = await request(app)
        .delete(`/api/questions/${testQuestionId}`)
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Question was deleted!");
    });
  });

  describe("Projects API", () => {
    it("should fetch all projects", async () => {
      const response = await request(app)
        .get("/api/projects")
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert(Array.isArray(response.body.projects));
      assert.strictEqual(response.body.projects[0].title, "Mock Project Title");
    });

    it("should create a project", async () => {
      const response = await request(app)
        .post("/api/projects")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          researcherId: "mock-researcher-id",
          title: "New Project Title",
          questions: [],
          status: "active",
        });
      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.message, "Project created!");
      assert.strictEqual(response.body.project.title, "New Project Title");
    });

    it("should update a project", async () => {
      const response = await request(app)
        .put(`/api/projects/${testProjectId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Updated Project Title",
        });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Project was updated");
      assert.strictEqual(response.body.project.title, "Updated Project Title");
    });

    it("should delete a project", async () => {
      const response = await request(app)
        .delete(`/api/projects/${testProjectId}`)
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Project was deleted!");
    });
  });

  describe("Sessions API", () => {
    it("should fetch all sessions", async () => {
      const response = await request(app)
        .get("/api/sessions")
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert(Array.isArray(response.body.sessions));
      assert.strictEqual(response.body.sessions[0].title, "Mock Session Title");
    });

    it("should create a session", async () => {
      const response = await request(app)
        .post("/api/sessions")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          projectId: "mock-project-id",
          title: "New Session Title",
          description: "New Session Description",
          startTime: "2025-05-06T10:00:00Z",
          finishedTime: "2025-05-06T12:00:00Z",
        });
      assert.strictEqual(response.status, 201);
      assert.strictEqual(response.body.message, "Session created!");
      assert.strictEqual(response.body.session.title, "New Session Title");
    });

    it("should update a session", async () => {
      const response = await request(app)
        .put(`/api/sessions/${testSessionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          title: "Updated Session Title",
        });
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Session was updated");
      assert.strictEqual(response.body.session.title, "Updated Session Title");
    });

    it("should delete a session", async () => {
      const response = await request(app)
        .delete(`/api/sessions/${testSessionId}`)
        .set("Authorization", `Bearer ${authToken}`);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.message, "Session was deleted!");
    });
  });
});