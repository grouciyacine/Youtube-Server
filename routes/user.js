import express from 'express';
import { verify } from '../tokenVer.js';
import { getUser, subcribe, unsubscribe, updateUser } from '../controllers/user.js'
const app = express.Router();
app.post('/subcribe/:id',verify,subcribe)
app.post('/unsubscribe/:id',verify,unsubscribe)
app.post('/updateUser/:id',verify,updateUser)
app.get('/getUser/:id',verify,getUser)


export default app