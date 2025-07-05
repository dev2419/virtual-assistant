import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            console.log("Token not found in cookies")
            return res.status(400).json({message:"token not found"})
        }
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded token:",verifyToken)
        req.userId=verifyToken.userId

        next()

    } catch (error) {
        console.log(" isAuth error:", error)
        return res.status(500).json({message:"is Auth error"})
    }
}

export default isAuth