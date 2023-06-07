import express from 'express';
import { verify } from '../tokenVer.js';
import { SubVideo, UpdateVideo, addViews, deleteVideo, dislikeVid, getVideo, likeVid, putVideo, randomVideo, search, tags, trend } from '../controllers/video.js';
const app = express.Router();

app.get('/getVideo/:id',verify,getVideo)
app.post('/putVideo',verify,putVideo)
app.delete('/deleteVideo/:id',verify,deleteVideo)
app.put('/updateVideo/:id',verify,UpdateVideo)
app.post('/likeVid/:id',verify,likeVid)
app.post('/unlikeVid/:id',verify,dislikeVid)
app.post('/addView/:id',verify,addViews)
app.get('/tags',verify,tags)
app.get('/search',verify,search)
app.get('/random',verify,randomVideo)
app.get('/trend',verify,trend)
app.get('/sub',verify,SubVideo)
//app.get('/getVideos',verify)

export default app