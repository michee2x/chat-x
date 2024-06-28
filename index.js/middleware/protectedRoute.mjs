import jwt from "jsonwebtoken"
import User from "../models/user.model.mjs"

export const protectedRoute = async (req, res, next) => {
try{
    console.log("this is the header",req.headers.cookie, "this is the cookie", req.cookies)
    const cookies = req.cookie.jwtToken
    
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