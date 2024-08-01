/* const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const   
 port = 3000; // You can change the port if needed

// Middleware for handling JSON request
app.use(cors());
app.use(express.json());

// Multer storage configuration for handling file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Create an 'uploads' directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// API endpoint for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  // Simulate image processing and analysis
  const plantInfo = {
    name: 'Lettuce (Lactuca sativa)',
    issue: 'Nutrient deficiency (N, K)',
    solution: 'Adjust nutrient solution, increase N and K levels',
  };
  res.json(plantInfo);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 */
