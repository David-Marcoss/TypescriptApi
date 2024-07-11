import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export async function getByEmail(email:string):Promise<IUsuarios | Error | undefined> {
    
    try {
        const result = await Knex(ETableNames.usuarios)
            .select("*")
            .where({email})
            .first()

        return result

    } catch (error) {
        console.log(error)
        return new Error("Erro ao buscar registro!!");
    }
}