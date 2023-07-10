import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

function createToken(user) {
  try {
    const token = jwt.sign({ user }, secretKey);
    return token;
  } catch (error) {
    console.log(error);
  }
}


function verifyAuthToken(req,res,next){
  try {
    let token = req.headers['authorization']
    if(!token){
      return res.status(401).send({
        message: "No token provided"
      })
    }
    else{
       token = token.split(' ')[1]
       jwt.verify(token, secretKey,(err)=>{
       if(err)
       {
          return res.status(400).send({
            message: "Invalid token"
          })
       }else{
          next()
       }
    })
    }
  } catch (error) {
    console.log(error)
  }
}

function verifyLinkToken(token, expireIn){

  try {
    const decoded = jwt.verify(token, secretKey, {expireIn: expireIn},(err)=>{
      if(err){
        return false
      }else{
        return true
      }
    })

    if(decoded){
      return true
    }else{
      return false;
    }
  } catch (error) {
    console.log(error)
  }
}


export { createToken , verifyAuthToken, verifyLinkToken };
