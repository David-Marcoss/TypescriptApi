import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers";
import { StatusCodes } from "http-status-codes";

interface IParamsProps{
    id: number
}

//schema de validação de dados
const ParamsValidation: yup.Schema<IParamsProps> =  yup.object().shape({
    id: yup.number().moreThan(0).required(),
})

export const getByIdValidation = validation({
    params: ParamsValidation,
}) 

export async function getById(req: Request, res: Response){

    const id = parseInt(req.params.id)

    const result = await PessoasProvider.getById(id)

    if( result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: result.message
                }
            }
        )
    }else if(result){
        return res.json(result)
    }else{
        return res.status(StatusCodes.NOT_FOUND).json({errors:{
            default: "Pessoa não encontrada"
        }})
    }
}