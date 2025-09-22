import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import globalRouter from './routes/global.route';
import jalurRouter from './routes/jalur.route';
import penginapanRouter from './routes/penginapan.route';
import fasilitasRouter from './routes/fasilitas.route';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalRouter);
app.use(jalurRouter);
app.use(penginapanRouter);
app.use(fasilitasRouter);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});