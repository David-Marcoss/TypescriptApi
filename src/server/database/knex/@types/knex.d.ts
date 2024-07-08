import { ICidades } from "../../models";


declare module "knex/types/tables"{
    interface tables{
        cidades:  ICidades,
        // pessoas:  iPessoas,
        // usuarios: iUsuarios
    }
}