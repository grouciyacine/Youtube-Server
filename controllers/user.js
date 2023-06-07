import User from "../models/user.js";

export const subcribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $addToSet:{subscriberUser:req.user.id},
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber:1}
        })
        return res.status(200).json('Subscribe with Success')
    }catch(e){
        next(e)
    }
}
export const unsubscribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscriber:-1},
        })
        await User.findByIdAndUpdate(req.params.id,{
            $pull:{subscriberUser:req.user.id}
        })
        return res.status(200).json('unsubscribed with success')
    }catch(e){
        next(e)
    }
}
export const updateUser = async(req, res, next)=>{
    try{
        if(req.user.id===req.params.id){
            const Update=await User.findByIdAndUpdate({_id:req.user.id},{
                $set:req.body
            })
        return res.status(200).json(Update)
        }else{
            return res.status(404).json('you can  update only your account')
        }
    }catch(e){
        next(e)
    }
}
export const getUser = async(req, res, next)=>{
    try{
        const user=await User.findById({_id:req.params.id})
        return res.status(200).json(user)
    }catch(e){
        next(e)
    }
}
export const deleteUser = async(req,res,next)=>{
    try{
    if(req.user.id===req.params.id){
        await User.findByIdAndDelete({_id:req.params.id})
        return res.status(200).json(' user deleted')
    }else{
        return res.status(404).json('you can delete only your account')
    }
    }catch(e){
        next(e)
    }

}