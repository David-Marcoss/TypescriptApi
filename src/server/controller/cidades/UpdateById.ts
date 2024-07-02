import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";

interface IParamsProps{
    id: number
}

interface IBody{
    nome: string
}

//schema de validação de dados
const ParamsValidation: yup.Schema<IParamsProps> =  yup.object().shape({
    id: yup.number().moreThan(0).required(),
})

const BodyValidation: yup.Schema<IBody> =  yup.object().shape({
    nome: yup.string().min(3).required()
})

export const updateByIdValidation = validation({
    params: ParamsValidation,
    body: BodyValidation
}) 

export async function updateById(req: Request, res: Response){

    return res.send("Rota updateById Cidades")
}