import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";
import { PessoasProvider } from "../../database/providers";
import { StatusCodes } from "http-status-codes";

interface IQueryProps{
    filter?: string,
    limit?: number,
    page?: number
    id?: number
}

//schema de validação de dados
const queryValidation: yup.Schema<IQueryProps> =  yup.object().shape({
    filter: yup.string(),
    limit: yup.number().integer().moreThan(0),
    page: yup.number().integer().moreThan(0),
    id: yup.number().integer().default(0)
})

export const getAllValidation = validation({
    "query": queryValidation,
}) 

export async function getAll(req: Request<{},{},{},IQueryProps>, res: Response){
    let {filter,limit,page,id} = req.query

    const result = await PessoasProvider.getAll(
        filter= filter || "",
        page= page || 1,
        limit= limit || 20,
        id= id || 0
    )

    if( result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: result.message
                }
            }
        )
    }else{
        return res.json(result)
    }
}