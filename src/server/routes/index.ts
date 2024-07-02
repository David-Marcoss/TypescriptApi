import { Router } from "express";
import { CidadesController } from "../controller";

const router = Router()

router.get("/", (req,res ) => res.send("Ola mundo!"))

router.post("/cidades",CidadesController.createValidation,CidadesController.create)
router.get("/cidades",CidadesController.getAllValidation,CidadesController.getAll)
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById)
router.put("/cidades/:id",CidadesController.updateByIdValidation,CidadesController.updateById)
router.delete("/cidades/:id",CidadesController.deleteByIdValidation,CidadesController.deleteById)






export {router}