import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";

interface IQueryProps{
    filter?: string,
    limit?: number,
    page?: number
}

//schema de validação de dados
const queryValidation: yup.Schema<IQueryProps> =  yup.object().shape({
    filter: yup.string(),
    limit: yup.number().integer().moreThan(0),
    page: yup.number().integer().moreThan(0)
})

export const getAllValidation = validation({
    "query": queryValidation,
}) 

export async function getAll(req: Request<{},{},{},IQueryProps>, res: Response){

    return res.json([])
}