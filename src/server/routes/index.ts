import { Router } from "express";
import { CidadesController } from "../controller";
import { PessoasController } from "../controller";

const router = Router()

router.get("/", (req,res ) => res.send("Ola mundo!"))

// rotas cidades
router.post("/cidades",CidadesController.createValidation,CidadesController.create)
router.get("/cidades",CidadesController.getAllValidation,CidadesController.getAll)
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById)
router.put("/cidades/:id",CidadesController.updateByIdValidation,CidadesController.updateById)
router.delete("/cidades/:id",CidadesController.deleteByIdValidation,CidadesController.deleteById)


// rotas Pessoas
router.post("/pessoas",PessoasController.createValidation,PessoasController.create)
router.get("/pessoas",PessoasController.getAllValidation,PessoasController.getAll)
router.get("/pessoas/:id",PessoasController.getByIdValidation,PessoasController.getById)
router.put("/pessoas/:id",PessoasController.updateByIdValidation,PessoasController.updateById)
router.delete("/pessoas/:id",PessoasController.deleteByIdValidation,PessoasController.deleteById)



export {router}