import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export async function getById(id:number):Promise<ICidades | Error | undefined> {
    
    try {
        const result = await Knex(ETableNames.cidades).select("*").where({id}).first()

        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}