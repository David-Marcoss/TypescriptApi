import { Request, Response } from "express";
import * as yup from "yup"
import { validation } from "../../shared/middleware";

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

    return res.send("Rota deleteById Cidades")
}