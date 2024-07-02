import "dotenv/config"
import "./shared/service/TranslationsYup"
import express from "express";
import { router } from "./routes";


const app =  express()

app.use(express.json())

app.use(router)


export {app}