import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export async function deleteById(id:number):Promise<number | Error> {
    
    try {
        const result = await Knex(ETableNames.pessoas).delete().where({id})

        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}