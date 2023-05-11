const ReadText = require('text-from-image')

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

app.post('/api/recognize', multer({storage}).single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send({error: 'No file provided in form data under key "file"'});
    }

    const filePath = path.join(__dirname, 'uploads', file.filename);

    ReadText(filePath)
        .then(text => res.status(200).send({content: text}))
        .catch(err => res.status(500).send({error: err}))
        .finally(() =>
            fs.unlink(filePath, err => err === null || console.error(err))
        );
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
