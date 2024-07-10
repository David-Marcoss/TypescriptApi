import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes"
import { IPessoas } from "../../database/models";
import { PessoasProvider } from "../../database/providers";

//Omit serve para omit uma propriedade
interface IBodyProps extends Omit<IPessoas,"id">{}

//schema de validação de dados
const bodyValidation: yup.Schema<IBodyProps> =  yup.object().shape({
    nomeCompleto: yup.string().min(3).required(),
    email: yup.string().min(10).required(),
    cidadeId: yup.number().integer().required()

})

export const createValidation = validation({
    "body": bodyValidation,
}) 

export async function create(req: Request<{},{},IBodyProps>, res: Response){

    const result = await PessoasProvider.create(req.body)

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

}