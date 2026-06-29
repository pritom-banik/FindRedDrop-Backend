const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");


const JWKS=createRemoteJWKSet(
    new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)
const verifyToken = async(req, res, next) => {
    const authHeader = req?.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    //console.log("the auth header:", authHeader);
    

    try{
        const {payload}= await jwtVerify(token,JWKS);
        //console.log(payload);
         next()
    }catch(error)
    {
        return res.status(403).json({message:"Forbidden"});
    }
}

module.exports = { verifyToken }