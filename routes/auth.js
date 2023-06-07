import express from 'express';
import { Google, logOut, login, register } from '../controllers/auth.js';

const app = express.Router();
app.post('/register',register)
app.post('/login',login)
app.post('/logOut',logOut)
app.post('/google',Google)
export default app