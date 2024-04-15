const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

app.listen(8080, () => {
  console.log('Servidor ejecutandose en 8080');
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
  });

app.post('/upload', upload.single('file'), (req, res) => {
    return res.json({ message: 'Subida OK' });
  });

app.use(express.static('.'));