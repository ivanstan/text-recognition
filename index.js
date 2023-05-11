const ReadText = require('text-from-image')

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

// Set up a route to handle POST requests containing image data
app.post('/upload', upload.single('image'), (req, res) => {
    // Get the uploaded file
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    // Save the file to disk
    const filePath = path.join(__dirname, 'uploads', file.filename);
    fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to save file');
        }

        ReadText(filePath).then(text => {
            res.status(200).send(text);
        }).catch(err => {
            res.status(500).send(err);
        })
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
