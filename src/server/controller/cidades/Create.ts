import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import statusCodes, { StatusCodes } from "http-status-codes"
import { ICidades } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";

//Omit serve para omit uma propriedade
interface IBodyProps extends Omit<ICidades,"id">{}

//schema de validação de dados
const bodyValidation: yup.Schema<IBodyProps> =  yup.object().shape({
    nome: yup.string().min(3).required()
})

export const createValidation = validation({
    "body": bodyValidation,
}) 

export async function create(req: Request<{},{},IBodyProps>, res: Response){

    const result = await CidadesProvider.create(req.body)

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