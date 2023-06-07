import comment from "../models/comment.js";
import Comment from "../models/comment.js";

export const createComment=async(req,res,next)=>{
        try{
            const comment = new Comment({user_id:req.user.id,video_id:req.params.id,...req.body})
            comment.save()
            return res.status(200).json('comment added');
        }catch(e){
            next(e)
        }
}
export const getComment=async(req,res,next)=>{
        try{
            const getAll=await Comment.find({video_id:req.params.id})
            return res.status(200).json(getAll)
        }catch(e){
            next(e)
        }
}
export const deleteComment=async(req,res,next)=>{
    try{
        const getComment=await Comment.findById({_id:req.params.id})
        if(req.user.id===getComment.user_id){
            await Comment.findByIdAndDelete({_id:req.params.id})
            return res.status(200).json('Comment deleted')
        }else{
        return res.status(404).json('You Can Delete Only Your Video')
        }
        
    }catch(e){
    next(e)
    }
}