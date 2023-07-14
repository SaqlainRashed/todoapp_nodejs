import jwt from "jsonwebtoken";
export const sendCookies= (user,res,message,statusCode=200)=>{
    const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET);
    // console.log(process.env.NODE_ENV);    
    // console.log(process.env.NODE_ENV === "Developement");    

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly :true,
            maxAge:15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Developement"? "lax" : "none",
            secure: process.env.NODE_ENV === "Developement"? false : true,
        })
        .json({
        success: true,
        message,
    });
};