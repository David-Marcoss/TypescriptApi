import { IPessoas } from "../../src/server/database/models";
import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("GetAll pessoas", () => {
    let token: string | undefined

    beforeAll(async () => {

        let userData = {
            "email": `${new Date()}@gmail.com`,
            "nome": "Testador",
            "senha": "senha123"
        }

        await testServer.post("/usuarios").send(userData)

        const response = await testServer.post("/login").send({
            email: userData.email,
            senha: userData.senha
        })

        token = response.body.token
    })

    it("should successfully GetAll pessoas", async () => {
        const insertCidade =  await testServer
            .post("/cidades")
            .set({authorization:token})
            .send({
                nome: "Picos"
            })
        
        const data:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)
        
        let response =  await testServer.get("/pessoas")
        .set({authorization:token})
        .send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?filter=testador")
        .set({authorization:token})
        .send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?limit=10")
        .set({authorization:token})
        .send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?page=2")
        .set({authorization:token})
        .send()
        expect(response.statusCode).toBe(statusCodes.OK)

    });

    it("should fail to GetAll pessoas when a query params are invalid", async () => {
        let response =  await testServer.get("/pessoas"+ "?limit=10d")
        .set({authorization:token})
        .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.limit")

        response =  await testServer.get("/pessoas"+ "?page=10d")
        .set({authorization:token})
        .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.page")

    });

    
});
