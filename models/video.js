import mongoose from "mongoose";
const Video=new  mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please enter a title'],
    },
    description:{
        type:String,
    },
    url:{
        type:String,
        required:[true,'Please enter a url'],
    },
    img:{
        type:String,
        required:[true,'Please enter img'],
    },
    user_id:{
    type:String,
    required:[true,'Please enter user_id'],
    },
    views:{
    type:Number,
    default:0,
    },
    tags:{
    type:[String],
    default:[],
    },
    like:{
        type:[String],
        default:[],
    },
    dislike:{
        type:[String],
        default:[],
    }
},{timestamps:true})
export default  mongoose.model('Video',Video)