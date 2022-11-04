import express from 'express';
import cors from 'cors';
import { userLogin, addNewUser } from './src/users.js';

const app = express();
const PORT = 3030;
app.use(cors());
app.use(express.json());

app.post('/login', userLogin);
app.post('/users', addNewUser);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));