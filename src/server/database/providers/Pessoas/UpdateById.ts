import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function updateById(id:number, pessoa:Omit<IPessoas,"id">):Promise<number | Error> {
    
    try {
        
        const cidadeExists = await Knex(ETableNames.cidades)
            .select("*")
            .where({ id: pessoa.cidadeId })
            .first();

        if (!cidadeExists) {
            return new Error("cidadeId não encontrado !!");
        }

        const emailExists = await Knex(ETableNames.pessoas)
            .select("email")
            .where({ email: pessoa.email })
            .first();

        if (emailExists && pessoa.email == emailExists.email) {
            return new Error("email já cadastrado !!");
        }

        const result = await Knex(ETableNames.pessoas).where({id}).update({...pessoa})
        
        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao atualizar registro!!");
    }
}