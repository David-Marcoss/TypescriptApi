import "dotenv/config"
import "./shared/service/TranslationsYup"
import express from "express";
import { router } from "./routes";
import { Knex } from "./database/knex";

const app =  express()

app.use(express.json())

app.use(router)

console.log(
    Knex("cidades").select("*"))

export {app}