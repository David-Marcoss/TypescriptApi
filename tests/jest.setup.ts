import supertest from "supertest"
import {app} from "../src/server/server"
import { Knex } from "../src/server/database/knex"

export const testServer = supertest(app)

beforeAll(async ()=> {
    await Knex.migrate.latest()
})

afterAll(async ()=> {
    await Knex.destroy()
})