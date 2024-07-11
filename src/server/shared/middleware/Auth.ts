import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function Auth(req:Request, res:Response, next:Function) {
    const authToken = req.headers["authorization"];
    const privateKey = process.env.PRIVATE_KEY || "default_private_key"

    if( authToken){
        jwt.verify(authToken,privateKey,
            (error, token_data) => {
                if(error){
                    return res.status(StatusCodes.UNAUTHORIZED).json({error: {
                        default:"token invalido !!!"
                    }})
                }else{
                    next()
                }
            }  
        )
    }else{
        return res.status(StatusCodes.UNAUTHORIZED).json({error: {
            default:"token de autenticação mescessario !!!"
        }})
    }
}