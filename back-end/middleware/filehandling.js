import multer from 'multer';
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

const upload = multer({ 
  storage, 
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Middleware to enrich req.file with extra metadata
const uploadArtifact = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { filename, path: filepath, mimetype, originalname } = req.file;

    // Determine media type
    let mediaType;
    if (mimetype.startsWith('image/')) mediaType = 'image';
    else if (mimetype.startsWith('audio/')) mediaType = 'audio';
    else if (mimetype.startsWith('video/')) mediaType = 'video';
    else mediaType = 'text';

    // Override req.file with a simplified object
    req.file = {
      filename: originalname, // what the user uploaded
      filepath: filename,     // the unique saved file
      mediaType
    };

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload, uploadArtifact };
