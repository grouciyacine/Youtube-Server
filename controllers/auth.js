import User from "../models/user.js";
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
                    const salt=bcrypt.genSaltSync(10)
        const newPassword=bcrypt.hashSync(req.body.password,salt)
    const NewUser=new  User({...req.body,password:newPassword})
    await NewUser.save()
    const token=jwt.sign({id:NewUser._id},process.env.JWT);
    const {password,...other}=NewUser._doc;
    res.cookie('access_token',token,{ secure: true, httpOnly: true });
    res.status(200).json(other);
    //res.status(200).json(NewUser)
        }else{
            res.status(500).json('user exist')
        }

    }catch(e){
        next(e)
    }
}
export const login=async(req,res,next)=>{
    try{
    const user=await User.findOne({email:req.body.email})
    if(user){
    const HasPassword=await bcrypt.compareSync(req.body.password,user.password)
    if(!HasPassword){
        res.status(403).json('error wrong password')
    }else{
        const token=jwt.sign({id:user._id},process.env.JWT);
        const {password,...other}=user._doc;
        res.cookie('access_token',token,{ secure: true, httpOnly: true });
        res.status(200).json(other);
    }
    }else{
        res.status(404).json('user not exist')
    }
    }catch(e){
next(e)
    }
}
export const logOut=async(req, res, next)=>{
    try{
            res.cookie('access_token',{
                secure:true,
                sameSite:"none"
            }).status(200).json('user had logged out')
    }catch(e){
next(e)
    }
}
export const Google=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        const {password,...other}=user._doc
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT)
            res.cookie('access_token',token,{
                httpOnly:true,
            })
            
            res.status(200).json(other);
        }else{
            const user=new User({...req.body,Google:true})
            const savedUser=await user.save()
            const{password,...other}=user._doc
            const token=jwt.sign({id:savedUser._id},process.env.JWT)
            res.cookie('access_token',token,{
                httpOnly:true,})
                res.status(200).json(other)
        }
    }catch(e){
        next(e)
    }
}