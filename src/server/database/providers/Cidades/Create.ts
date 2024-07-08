import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidades } from "../../models";

export async function create(cidade:Omit<ICidades,"id">):Promise<number | Error> {
    
    try {
        const [result] = await Knex(ETableNames.cidades)
            .insert(cidade)
            .returning("id");
            
        return result.id

    } catch (error) {
        console.log(error)
        return new Error("Erro ao criar registro !!");
    }
}