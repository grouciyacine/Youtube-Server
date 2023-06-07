import Video from '../models/video.js'
import User from '../models/user.js'

export const putVideo=async(req,res,next)=>{
    try{
        const newVid= new Video({user_id:req.user.id,...req.body})
        const saveVideo=await newVid.save()
        return res.status(200).json(saveVideo)
    }catch(e){
        next(e)
    }
}
export const getVideo=async(req,res,next)=>{
    try{
        const getVid= await Video.findById({_id:req.params.id})
        return res.status(200).json(getVid)
    }catch(e){
        next(e)
    }
}
export const deleteVideo=async(req,res,next)=>{
    try{
        const getVid= await Video.findById({_id:req.params.id})
        if(!getVid) return res.status(404).json('video not found')
        console.log(req.user.id)
        if(req.user.id===getVid.user_id){
            const de=await Video.findByIdAndDelete({_id:req.params.id})
            return res.status(200).json('delete with success')
        }else{
            return res.status(404).json('you can  delete only yours videos')
        }
    }catch(e){
        next(e)
    }
}
export const UpdateVideo=async(req,res,next)=>{
    try{
        const getVideo= await Video.findById({_id:req.params.id})
        if(!getVideo) return res.status(404).json('video not found')
        if(req.user.id===getVideo.user_id){
            const updateVid=await Video.findByIdAndUpdate({_id:req.params.id},{
                $set:req.body
            },{new:true})
            return res.status(200).json(updateVid)
        }else{
            return res.status(404).json('err you can update only your videos')
        }
    }catch(e){
        next(e)
    }
}
export const  likeVid=async(req,res,next)=>{
    try{
        const id=req.user.id
        const getVid=await Video.findByIdAndUpdate(req.params.id,{
            $addToSet:{like:id},
            $pull:{dislike:id}
        });
        return res.status(200).json('like with successful ')
    }catch(e){
        next(e)
    }
}
export const  dislikeVid=async(req,res,next)=>{
    try{
        const id=req.user.id
        const getVid=await Video.findByIdAndUpdate(req.params.id,{
            $pull:{like:id},
            $addToSet:{dislike:id}
        });
        return res.status(200).json('dislike with successful')
    }catch(e){
        next(e)
    }
}
export const addViews=async(req,res,next)=>{
    try{
        const getVid=await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        return res.status(200).json('view added successfully')
    }catch(e){
        next(e)
    }
}
export const tags=async(req,res,next)=>{
    try{   
        const tag=req.query.tags.split(',')
    console.log(tag)
    const getAll=await Video.find({tags:{$in:tag}}).limit(20)
    return res.status(200).json(getAll)
    }catch(e){
        next(e)
    }
}
export const search=async(req,res,next)=>{
    try{
const search=req.query.search
const getVid=await Video.find({title:{$regex:search,$options:'i'},}).limit(20)
return res.status(200).json(getVid)
    }catch(e){
next(e)
    }
    
}
export const randomVideo = async(req,res,next)=>{
    try{
        const RanVid=await Video.aggregate([{$sample:{size:40}}])
        return res.status(200).json(RanVid)
    }catch(e){
        next(e)
    }
}
export const trend=async(req,res,next)=>{
    try{
        const trendVid=await Video.find().sort({views:-1})
        res.status(200).json(trendVid)
    }catch(e){
        next(e)
    }
}
export const SubVideo=async(req,res,next)=>{
    try{ 
        const getUser=await User.findById(req.user.id)
        const getSubUser=await getUser.subscriberUser
        const list=await Promise.all(
            getSubUser.map((channel)=>{
                return Video.find({user_id:channel})
            })
        )
        //res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
        res.status(200).json(list[0])
    }catch(e){
        next(e)
    }
}