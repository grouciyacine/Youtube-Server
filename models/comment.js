import mongoose from 'mongoose';

const CommentSchema=new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    video_id:{
        type:String,
        required:true
    }
},{timestamps:true})

export default  mongoose.model('Comment',CommentSchema)