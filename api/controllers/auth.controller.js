import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

const sendEmail = async (req, res,next) => {
    const email = req.body.email;
    const user = await User.findOne({ email:{$regex:'^'+email+'$', $options:'i'}});
    if(!user){
        return res.status(404).send({ message: "Email not found" });
    }

    const payload = {
        email : user.email,
    }
    const expiryTIME = 300;
    const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:expiryTIME});

    const newToken = new UserToken({
        userId : user._id,
        token : token
    });

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // let mailDetails = {
    //     from: process.env.EMAIL,
    //     to: email,
    //     subject: 'Password Reset',
    //     html: `
    //     <html>
    //     <head>
    //         <title>Reset Password</title>
    //     </head>
    //     <body>
    //         <h1>Welcome to KhemzBook Shop</h1>
    //         <p> Dear ${user.firstName},</p>
    //         <p> You have requested to reset your password. Click on the link below to reset your password</p>
    //         <a href="${process.env.LIVE_URL}/reset/${token}">Reset Password</a>
    //         <p> This link will expire in 5 minutes</p>
    //         <p> If you did not request a password reset, please ignore this email</p>
    //         <p>Thank you</p>
    //     </body>
    //     </html>
    //     `
    // };
    let mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        html: `
        <html>
        <head>
            <title>Reset Password</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    width: 80%;
                    margin: auto;
                    background-color: #f7f7f7;
                    padding: 20px;
                    border-radius: 15px;
                }
                a {
                    display: inline-block;
                    color: white;
                    background-color: #4CAF50;
                    padding: 10px 20px;
                    margin: 10px 0px;
                    border-radius: 5px;
                    text-decoration: none;
                }
                a:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset Request</h1>
                <p> Dear ${user.firstName},</p>
                <p> You have requested to reset your password. Click on the link below to reset your password</p>
                <a href="${process.env.LIVE_URL}/reset/${token}">Reset Password</a>
                <p> This link will expire in 5 minutes</p>
                <p> If you did not request a password reset, please ignore this email</p>
                <p>Thank you</p>
            </div>
        </body>
        </html>
        `
    };

    mailTransporter.sendMail(mailDetails, async function(err, data) {
        if(err) {
            console.log('Error Occurs');
            return res.status(500).send({message:"Error sending email"});
        } else {
            console.log('Email sent successfully');
            await newToken.save();
            return res.status(200).send({message:"Email sent successfully"});
        }
    });
}

const resetPassword = async(req,res,next)=>{
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token,process.env.TOKEN_SECRET,async (err,decoded)=>{
        if(err){
            return res.status(400).send({message:"Invalid or expired token"});
        
        }else{
            const response = decoded;
            const user = await User.findOne({email:response.email});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            try{
                const updatedUser = await User.findByIdAndUpdate(
                    {_id:user._id},
                    {$set:user},
                    {new:true}
                )
                return res.status(200).send({message:"Password reset successfully"});
            }catch(err){
                return res.status(500).send({message:err});
            }
        }
});
}



export { register , login , registerAdmin, sendEmail,resetPassword};