import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// If using S3, create a route to generate signed URLs
app.get('/file/:filename', async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.filename,
      Expires: 60 * 5 // URL expires in 5 minutes
    };
    
    const url = await s3.getSignedUrlPromise('getObject', params);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});