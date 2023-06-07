import express from 'express';
import { verify } from '../tokenVer.js';
import { createComment, deleteComment, getComment } from '../controllers/comment.js'
const app = express.Router();
app.post('/addCom/:id',verify,createComment)
app.get('/getAll/:id',verify,getComment)
app.delete('/DeleteCom/:id',verify,deleteComment)

export default app