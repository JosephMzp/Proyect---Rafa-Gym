import Usuario from "../models/user.model.js"
import bcrypt, { hash } from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import jwt from 'jsonwebtoken';
import {token_secret} from '../config.js'
//import { email } from "zod/v4"

export const register = async (req, res) => {
    
    const {username, email, password, rol} = req.body

    try{
        const userFound = await Usuario.findOne({email})
        if(userFound) return res.status(400).json(["El correo ya esta en uso"]);

        const passwordHash = await bcrypt.hash(password, 8)

        const newUser = new Usuario({
        username,
        email,
        password: passwordHash,
        rol
    })

    const userSaved = await newUser.save();
    const token = await createAccessToken({id:userSaved._id})

    res.cookie('token', token)

    res.json({
        id:userSaved._id,
        username:userSaved.username,
        email:userSaved.email,
        createdAt:userSaved.createdAt,
        updatedAt:userSaved.updatedAt,
    })
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body

    try{
        const userFound = await Usuario.findOne({email})
        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
        
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch) return res.status(400).json({message:"Contraseña incorrecta"})

    const token = await createAccessToken({id:userFound._id})

    res.cookie('token', token)
    res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        rol:userFound.rol,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    })
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

export const logout = (req,res)=>{
    res.cookie("token", "", {expires: new Date(0) })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await Usuario.findById(req.usuario.id);
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
    return res.json({
        id: userFound._id,
        username:userFound.username,
        email:userFound.email,
        rol:userFound.rol,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
   const {token} = req.cookies

   if(!token) return res.status(401).json({message:"No autorizado"})
    
    jwt.verify(token, token_secret, async (err,usuario) => {
        if(err) return res.status(401).json({message: "No autorizado"});

        const userFound = await Usuario.findById(usuario.id)
        if(!userFound) return res.status(401).json({message: "No autorizado"})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email:userFound.email,
        });
    });
};