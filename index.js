import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { approuter } from './routes/referral.Routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.use('/api', approuter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
