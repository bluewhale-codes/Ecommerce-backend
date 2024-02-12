// create token and save in cookies
const jwt = require("jsonwebtoken");

const sendToken = (data,JWT_SECRET,statusCode,res)=>{
    const authtoken = jwt.sign(data,JWT_SECRET,{expiresIn:'24h'})

    const options = {
          expires: new Date(
             Date.now() + 2*24*60*60*1000
          ),
          httpOnly:true
    }

    res.status(statusCode).cookie("token",authtoken,options).json({
        success:true,
        authtoken,
        user:data.userD
    });
}

module.exports = sendToken;