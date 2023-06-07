import mongoose from "mongoose";
mongoose.set('strictQuery', true)
export default function connect(url){
    return  mongoose.connect(url)
}
