import jwt from "jsonwebtoken"
import User from "../models/user.model.mjs"

export const protectedRoute = async (req, res, next) => {
try{
    console.log(req)
    const cookies = req.headers.cookie
    
    if(!cookies) {
        console.log("no token found")
    return res.status(401).json({error:"there i no token in your headers"})}

    const decoded =  jwt.verify(cookies, "thi is jwt secret")

    if(!decoded) return res.status(401).json({error:"invalid token i headers"})

    const foundUser = await User.findById(decoded.payload)

    if(!foundUser) return res.status(404).json({error:"user not found err..."})

    req.user = foundUser

    next()

}catch(error){

    console.log("error in protectedRoute: ", error)
    res.status(500).json({error:"Internl server error"})

}
}