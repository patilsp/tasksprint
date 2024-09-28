import JWT, { JwtPayload } from 'jsonwebtoken';

const JWT_KEY="!@#$%^&*(!@#$%^&*#$%^&*";
const JWT_KEY2="!@#$%^2345&*(!@#$%^&*#$%^&*";

export const GenerateToken = async(user:string)=>{
    return await JWT.sign({userId:user},JWT_KEY,{
        expiresIn:'1d'
    })
}


export const VerifyToken = async(token:string)=>{
    const verifydata =  await JWT.verify(token,JWT_KEY) as JwtPayload;

    const userId = verifydata['userId'];
    return userId;
}

export const GenerateTokenReset = async(user:string)=>{
    return await JWT.sign({userId:user},JWT_KEY2,{
        expiresIn:'1h'
    })
}


export const VerifyTokenReset = async(token:string)=>{
    const verifydata =  await JWT.verify(token,JWT_KEY2) as JwtPayload;

    const userId = verifydata['userId'];
    return userId;
}