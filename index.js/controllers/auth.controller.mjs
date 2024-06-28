import passport from "passport"
import data from '../db/user.data.mjs'
import bcrypt from "bcryptjs"
import User from "../models/user.model.mjs"
import jwt from "jsonwebtoken"



export const getHome = (req, res) => {
    return req.user ? res.json({message:"welcome to home page", data:req.user}) : res.json({error:"you are not authenticated"})
}


export const Signup = async (req, res) => {
    try{
const {name, username, email, password, profilePic} = req.body

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.status(400).json({error:{type:"existingUser"}})
    }
    const existingEmail = await User.findOne({email})
    if(existingEmail){
        return res.status(400).json({error:{type:"existingEmail"}})
    }
    /* const existingPassword = await User.findOne({password})
    if(existingUser){
        return res.status(400).json({error:"that password already exist..."})
    } */

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    

    const newUser = new User({
        name,
        username,
        password : hashedPassword,
        email,
        profilePic
    })

    newUser.save()
     
    if(newUser) {
         generateToken(newUser._id, res)
        
      

        res.status(200).json({
            _id:newUser._id,
            name:newUser.name,
            username:newUser.username,
            profilePic:newUser.profilePic,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profilecover:newUser.profilecover
        })
    } else {
        return res.status(400).json({
            error:"Invalid user data"
        })
    }
    } catch(error){
console.log("there was an error in signup controller: ", error)
    }
}

export const login = async (req, res) => {
   try{
    const {username,password} = req.body

    const user = await User.findOne({username}).populate("followers")
    if(!user) return res.status(404).json({error:{type:"nameError"}})


    const wrongPasword = await bcrypt.compare(password || "", user.password)


    if(!wrongPasword){
        return res.status(401).json({error:{type:"password"}})
}
   generateToken(user._id, res)
    res.json({loggedUser:user})

   } catch(error){
console.log("there was an error in signup controller: ", error)
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwtToken", "", {
        maxAge:0
    })
    res.json({message:"logged out successfully"})
    }catch (error) {
        console.log("loggedout successful")
    }
}
const  generateToken = (payload, res) => {
    try{
    const token = jwt.sign({payload}, "thi is jwt secret", {
        expiresIn:`15d`
    })
    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite:"strict",
        secure: true,
    })

    } catch (error){
console.log("there was an error in signup controller: ", error)
    }
}