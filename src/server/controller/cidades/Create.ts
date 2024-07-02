import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";

interface ICidades{
    nome:string,
}

//schema de validação de dados
const bodyValidation: yup.Schema<ICidades> =  yup.object().shape({
    nome: yup.string().min(3).required()
})

export const createValidation = validation({
    "body": bodyValidation,
}) 

export async function create(req: Request<{},{},ICidades>, res: Response){

    return res.send("Rota Create Cidades")
}