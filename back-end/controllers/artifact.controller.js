import multer from 'multer';
import Artifact from '../models/artifacts.model.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Configurate storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'audio/mpeg', 'video/mp4', 'text/plain', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for upload to multer
});

// Handle the file upload
const uploadArtifact = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { researcherId } = req.body;
    const { filename, path: filepath, mimetype } = req.file;

    // Set media type
    let mediaType;
    if (mimetype.startsWith('image/')) mediaType = 'image';
    else if (mimetype.startsWith('audio/')) mediaType = 'audio';
    else if (mimetype.startsWith('video/')) mediaType = 'video';
    else mediaType = 'text';

    const artifact = new Artifact({
      researcherId,
      filename,
      filepath,
      mediaType
    });

    await artifact.save();
    
    res.status(201).json({
      message: 'File uploaded successfully',
      artifactId: artifact._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload, uploadArtifact };