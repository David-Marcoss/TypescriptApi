import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { CidadesProvider } from "../../database/providers/Cidades";
import { StatusCodes } from "http-status-codes";

interface IParamsProps{
    id: number
}

//schema de validação de dados
const ParamsValidation: yup.Schema<IParamsProps> =  yup.object().shape({
    id: yup.number().moreThan(0).required(),
})

export const deleteByIdValidation = validation({
    params: ParamsValidation,
}) 

export async function deleteById(req: Request, res: Response){

    const id = parseInt(req.params.id)

    const result = await CidadesProvider.deleteById(id)

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
            default: "Cidade não encontrada"
        }})
    }
}