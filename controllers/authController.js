// user schema import kar liya 
const userModel = require("../models/userModel")

// for hashing the password 
const bcrypt=require('bcryptjs')

// for generating token 
const jwt=require('jsonwebtoken')


// register controller  
const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})

        // validation 
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'user already exists',
                
            })
        }

        // password hash 
        const salt=await bcrypt.genSalt(10)

        const hashPassword=await bcrypt.hash(req.body.password,salt);

        req.body.password=hashPassword


        // rest data access and appending in the userModel 
        const user=new userModel(req.body)

        await user.save();

        return res.status(201).send({
            success:true,
            message:'user registered successfully',
            user        // sending whole json 
        })
    
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }
}



// login controller  

const loginController=async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email});;
        if(!user){
            return res.status(404).send({
                success:false,
                message:'invalid credentials',
            })
        }
        
        // check role 
        if(user.role!==req.body.role){
            return res.status(404).send({
                success:false,
                message:'role doesnt match',
            })
        }


        // compare password 

        const comparePassword=await bcrypt.compare(req.body.password,user.password);
        // compare me (entered password , database me registered password)

        // if password not matched 
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'invalid credentials'
            })
        }

        // here we are generating token using signature fn of jwt 
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        // sign (_id id de degi isko database me particular user se nikal ke , and the secret key from .env file , and expiring time of token )

        

        return res.status(200).send({
            success:true,
            message:'login successful',
            token ,
            user,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login api',
            error   
        })
    }
}

// getting current user 
// uses authMiddleware also 
const currentUserController = async(req,res)=>{
    try{

        // userId coming from authController login token me se 
        const user =await userModel.findOne({_id:req.body.userId})

        return res.status(200).send({
            success:true,
            message:'user fetched successfully',
            user 
        })
    }
    catch (error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'unable to get current user',
            error    
        })
    }
}

module.exports={registerController,loginController,currentUserController}