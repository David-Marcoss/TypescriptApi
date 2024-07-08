import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export async function updateById(id:number, cidade:Omit<ICidades,"id">):Promise<number | Error> {
    
    try {
        const result = await Knex(ETableNames.cidades).where({id}).update({...cidade})
        
        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}