import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export async function create(usuario: Omit<IUsuarios, "id">): Promise<number | Error> {
    try {

        const [result] = await Knex(ETableNames.usuarios)
            .insert(usuario)
            .returning("id");

        return result.id; 

    } catch (error) {
        console.error(error);
        return new Error("Erro ao criar registro!!");
    }
}
