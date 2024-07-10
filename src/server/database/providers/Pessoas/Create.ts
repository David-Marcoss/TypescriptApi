import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoas } from "../../models";

export async function create(pessoa: Omit<IPessoas, "id">): Promise<number | Error> {
    try {
        
        const emailExists = await Knex(ETableNames.pessoas)
            .select("*")
            .where({ email: pessoa.email })
            .first();

        if (emailExists) {
            return new Error("email já cadastrado !!");
        }
        const cidadeExists = await Knex(ETableNames.cidades)
            .select("*")
            .where({ id: pessoa.cidadeId })
            .first();

        if (!cidadeExists) {
            return new Error("cidadeId não encontrado !!");
        }

        const [result] = await Knex(ETableNames.pessoas)
            .insert(pessoa)
            .returning("id");

        return result.id; 

    } catch (error) {
        console.error(error);
        return new Error("Erro ao criar registro!!");
    }
}
