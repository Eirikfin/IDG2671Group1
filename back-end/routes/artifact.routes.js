import express from 'express';
import { upload, uploadArtifact } from '../controllers/artifact.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route which requires researcher authentication
router.post('/', 
  authMiddleware, 
  upload.single('file'), 
  uploadArtifact
);

// Get artifacts form a researcher
router.get('/researcher/:researcherId', authMiddleware, async (req, res) => {
  try {
    const artifacts = await Artifact.find({ researcherId: req.params.researcherId });
    res.json(artifacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;