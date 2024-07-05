import { knex } from "knex"
import {development,production,tests} from "./Environment"


const getEnviroment = () => {
    switch (process.env.NODE_ENV) {
        case "production": return production
        case "tests": return tests
        default: return development
    }
}

export const Knex = knex(getEnviroment())