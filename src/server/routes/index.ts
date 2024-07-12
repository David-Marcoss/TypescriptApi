import { Router } from "express";
import { CidadesController, UsuariosController } from "../controller";
import { PessoasController } from "../controller";
import { Auth } from "../shared/middleware";

const router = Router()

router.get("/", (req,res ) => res.send("Ola mundo!"))

// rotas cidades
router.post("/cidades",Auth, CidadesController.createValidation,CidadesController.create)
router.get("/cidades",Auth,  CidadesController.getAllValidation,CidadesController.getAll)
router.get("/cidades/:id",Auth, CidadesController.getByIdValidation,CidadesController.getById)
router.put("/cidades/:id",Auth, CidadesController.updateByIdValidation,CidadesController.updateById)
router.delete("/cidades/:id",Auth, CidadesController.deleteByIdValidation,CidadesController.deleteById)


// rotas Pessoas
router.post("/pessoas",Auth, PessoasController.createValidation,PessoasController.create)
router.get("/pessoas",Auth, PessoasController.getAllValidation,PessoasController.getAll)
router.get("/pessoas/:id",Auth, PessoasController.getByIdValidation,PessoasController.getById)
router.put("/pessoas/:id",Auth, PessoasController.updateByIdValidation,PessoasController.updateById)
router.delete("/pessoas/:id",Auth, PessoasController.deleteByIdValidation,PessoasController.deleteById)

// rotas usuarios
router.post("/usuarios",UsuariosController.createValidation,UsuariosController.create)
router.post("/login",UsuariosController.loginValidation,UsuariosController.login)


export {router}