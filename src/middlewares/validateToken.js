import jwt from "jsonwebtoken"
import {token_secret} from "../config.js"

export const authRequired = (req, res, next) =>{
    const {token} = req.cookies;
    if(!token) 
        return res.status(401).json({message:"No token"})

    jwt.verify(token, token_secret, (err,usuario) => {
        if(err) return res.status(403).json({message:"token invalido"});

        req.usuario = usuario
        next();
    })
}