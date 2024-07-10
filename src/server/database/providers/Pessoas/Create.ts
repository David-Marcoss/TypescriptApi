import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function create(pessoa:Omit<IPessoas,"id">):Promise<number | Error> {
    
    try {
        const [result] = await Knex(ETableNames.pessoas)
            .insert(pessoa)
            .returning("id");
        
            
        return result.id

    } catch (error) {
        console.log(error)
        return new Error("Erro ao criar registro !!");
    }
}