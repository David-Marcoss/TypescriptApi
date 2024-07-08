import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { ICidades } from "../../database/models";
import { CidadesProvider } from "../../database/providers/Cidades";
import { StatusCodes } from "http-status-codes";

interface IParamsProps{
    id: number
}

interface IBodyProps extends Omit<ICidades,"id">{}

//schema de validação de dados
const ParamsValidation: yup.Schema<IParamsProps> =  yup.object().shape({
    id: yup.number().moreThan(0).required(),
})

const BodyValidation: yup.Schema<IBodyProps> =  yup.object().shape({
    nome: yup.string().min(3).required()
})

export const updateByIdValidation = validation({
    params: ParamsValidation,
    body: BodyValidation
}) 

export async function updateById(req: Request, res: Response){

    const id = parseInt(req.params.id)
    const data = req.body

    const result = await CidadesProvider.updateById(id, data)

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