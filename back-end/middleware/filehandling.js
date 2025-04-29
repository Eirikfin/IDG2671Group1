import multer from "multer";

// Configure destination and filename



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {

    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFile = upload.single("file");

