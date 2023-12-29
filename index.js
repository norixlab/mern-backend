import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import 'dotenv/config';

import userRoute from './routes/auth.js';
import postRoute from './routes/posts.js';

const { PORT, DATABASE_CONNECT } = process.env;

mongoose
    .connect(DATABASE_CONNECT)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.post('/uploads', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.use(express.json());
app.use('/auth', userRoute);
app.use('/posts', postRoute);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, (err) => {
    if (err) return console.log('SERVER ERROR', err);
    console.log('SERVER OK');
});
