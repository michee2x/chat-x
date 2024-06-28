import jwt from 'jsonwebtoken'

export const  generateToken = (payload, res) => {
    try{
    const token = jwt.sign({payload}, "thi is jwt secret", {
        expiresIn:`15d`
    })
    res.cookie("jwtToken", token.toString(), {
        maxAge: 1000*10*16,
        httpOnly:true,
        sameSite:"None",
        secure: true,
    })

    } catch (error){
console.log("there was an error in signup controller: ", error)
    }
}