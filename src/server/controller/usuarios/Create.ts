import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes"
import { IUsuarios } from "../../database/models";
import {UsuariosProvider } from "../../database/providers";
import { generatePasswordHash } from "../../shared/service";

//Omit serve para omit uma propriedade
interface IBodyProps extends Omit<IUsuarios,"id">{}

//schema de validação de dados
const bodyValidation: yup.Schema<IBodyProps> =  yup.object().shape({
    nome: yup.string().min(3).required(),
    email: yup.string().min(10).required(),
    senha: yup.string().min(8).required()
})

export const createValidation = validation({
    "body": bodyValidation,
}) 

export async function create(req: Request<{},{},IBodyProps>, res: Response){

    const emailExist = await UsuariosProvider.getByEmail(req.body.email)

    if(!emailExist){

        const data = req.body
        data.senha = await generatePasswordHash(data.senha)

        const result = await UsuariosProvider.create(req.body)
        
        if( result instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors:{
                        default: result.message
                    }
                }
            )
        }else{
            res.status(StatusCodes.CREATED).json({id:result})
        }
    
    }else{
        res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: "Email já cadastrado !!"
            }
        }
    )
    }


}