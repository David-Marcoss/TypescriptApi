import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function updateById(id:number, pessoa:Omit<IPessoas,"id">):Promise<number | Error> {
    
    try {
        const result = await Knex(ETableNames.pessoas).where({id}).update({...pessoa})
        
        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}