import {z} from "zod";
const {User} =require("../db");
const jwt =require ("jsonwebtoken");
const {JWT_SECRET } =require("../config");
const {authMiddleware} =require("../middleware");


const express = require("express");
const  router = express.Router();

const singUpBody =z.object({
    username:z.string().email(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string(),
})

router.post("/signup", async (req,res)=>{
    const {success} = singUpBody.safeParse(req.body)
    if(!success){
        return  res.status(411).json({
            message : "Email already taken/Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return  res.status(411).json({
            message : "Email already taken/Incorrect inputs"
        }) 
    }
    const user= await User.create({
        username:req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password:req.body.password
    })
    const userId= user._id;

    const token =jwt.sign({
        userId
    },JWT_SECRET);
    res.json({
        message:"User created Successfully",
        token: token
    })

})

const signInBody = z.object({
    username: z.string().email(),
	password: z.string()
})
router.post("/signin", async (req,res)=>{
    const { success } = signInBody.safeParse(req.body)
    if(!success){
        return  res.status(411).json({
            message : "Email already taken/Incorrect inputs"
        })
    }
    const user= await User.findOne({
        username:req.body.username,
        password:req.body.password,
    });
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})
const update = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().min(3).optional()
})

router.put("/user",async (req,res)=>{
    const {success} = update.safeParse(req.body)
    if(!success){
        return  res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({
        _id: req.userId},
        req.body
    )
    res.status(200).json({
        message: "Updated successfully"
    })

})

router.get("/bulk",async (req,res)=>{
    const filter= req.params.filter || "";
    const users= await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            },
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))

    })
})




module.exports= router;