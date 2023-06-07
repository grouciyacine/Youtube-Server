import mongoose, { Schema } from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,'please enter a name'],
    },
    email:{
        type:String,
        require:[true,'please enter a email'],
        unique:true,
    },
    img:{
        type:String,
    },
    password:{
        type:String,
    },
    userName:{
        type:String,
        require:[true,'please enter a username'],
        unique:true,
    },
    subscriber:{
        type:Number,
        default:0,
    },
    subscriberUser:{
        type:[String],
    },
    fromGoogle:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
export default  mongoose.model('User',UserSchema);