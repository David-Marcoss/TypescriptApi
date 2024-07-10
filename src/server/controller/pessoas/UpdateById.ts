import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup"
import { validation } from "../../shared/middleware";

import { IPessoas } from "../../database/models";
import { PessoasProvider } from "../../database/providers";

interface IParamsProps{
    id: number
}

interface IBodyProps extends Omit<IPessoas,"id">{}

//schema de validação de dados
const ParamsValidation: yup.Schema<IParamsProps> =  yup.object().shape({
    id: yup.number().moreThan(0).required(),
})

const bodyValidation: yup.Schema<IBodyProps> =  yup.object().shape({
    nomeCompleto: yup.string().min(3).required(),
    email: yup.string().min(10).required(),
    cidadeId: yup.number().integer().required()

})

export const updateByIdValidation = validation({
    params: ParamsValidation,
    body: bodyValidation
}) 

export async function updateById(req: Request, res: Response){

    const id = parseInt(req.params.id)
    const data = req.body

    const result = await PessoasProvider.updateById(id, data)

    if( result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: result.message
                }
            }
        )
    }else if(result == 1){
        return res.status(StatusCodes.OK).send()
    }else{
        return res.status(StatusCodes.NOT_FOUND).json({errors:{
            default: "Pessoa não encontrada"
        }})
    }
    
}