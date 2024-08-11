import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import user from './route/user.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', user);

app.listen(3001, () => {
  console.log('Backend started at port 3001');
});
