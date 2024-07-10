import { ICidades, IPessoas, IUsuarios } from "../../models";


declare module "knex/types/tables"{
    interface tables{
        cidades:  ICidades,
        pessoas:  IPessoas,
        usuarios: IUsuarios
    }
}