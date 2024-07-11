import { Router } from "express";
import { CidadesController, UsuariosController } from "../controller";
import { PessoasController } from "../controller";
import { Auth } from "../shared/middleware";

const router = Router()

router.get("/", (req,res ) => res.send("Ola mundo!"))

// rotas cidades
router.post("/cidades",CidadesController.createValidation,CidadesController.create)
router.get("/cidades",Auth, CidadesController.getAllValidation,CidadesController.getAll)
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById)
router.put("/cidades/:id",CidadesController.updateByIdValidation,CidadesController.updateById)
router.delete("/cidades/:id",CidadesController.deleteByIdValidation,CidadesController.deleteById)


// rotas Pessoas
router.post("/pessoas",PessoasController.createValidation,PessoasController.create)
router.get("/pessoas",PessoasController.getAllValidation,PessoasController.getAll)
router.get("/pessoas/:id",PessoasController.getByIdValidation,PessoasController.getById)
router.put("/pessoas/:id",PessoasController.updateByIdValidation,PessoasController.updateById)
router.delete("/pessoas/:id",PessoasController.deleteByIdValidation,PessoasController.deleteById)

// rotas usuarios
router.post("/usuarios",UsuariosController.createValidation,UsuariosController.create)
router.post("/login",UsuariosController.loginValidation,UsuariosController.login)


export {router}