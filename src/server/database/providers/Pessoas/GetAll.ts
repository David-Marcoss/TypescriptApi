import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function getAll(filter: string, page:number, limit: number, id=0): Promise<IPessoas[] | Error> {
    
    try {
        const result = await Knex(ETableNames.pessoas)
            .select("*")
            .where({id})
            .orWhere("nomeCompleto","like",`%${filter}%`)
            .offset((page-1)*limit)
            .limit(limit)
        
        if( id > 0 && result.every( e => e.id != id)){

            const data = await Knex(ETableNames.pessoas)
            .select("*")
            .where({id})
            .first()

            return data == null ? result : [data,...result]

        }else{
            return result;
        }

    } catch (error) {
        console.log(error);
        return new Error("Erro ao buscar registro!!");
    }
}