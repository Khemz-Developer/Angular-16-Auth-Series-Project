import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res,next) => {
    
    const role = await Role.find({role:"User"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.userName,
        email : req.body.email,
        password : hashedPassword,
        roles : role
    });

    await newUser.save();
    return res.status(201).json({message:"User registered successfully"});
}


const registerAdmin = async (req, res,next) => {
    
    const role = await Role.find({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.userName,
        email : req.body.email,
        password : hashedPassword,
        isAdmin : true,
        roles : role
    });

    await newUser.save();
    return res.status(201).send({message:"User registered successfully"});
}

const login = async (req, res,next) => {
    try{

        const user = await User.findOne({email:req.body.email}).populate("roles","role");
        const {roles} = user;
        if(!user){
            return res.status(404).send({message:"User not found"});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).send({message:"Invalid Password"});
        }
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin,roles:roles},process.env.TOKEN_SECRET);
        res.cookie("access-token",token,{httpOnly:true}).status(200)
        .json({
            status:200,
            message:"User logged in successfully",
            data:user
        });
    }catch(err){
        return res.status(500).send({message:err});
    }
}

export { register , login , registerAdmin};