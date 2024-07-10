import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function getById(id:number):Promise<IPessoas | Error | undefined> {
    
    try {
        const result = await Knex(ETableNames.pessoas).select("*").where({id}).first()

        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}