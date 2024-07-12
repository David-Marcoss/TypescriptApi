import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Update Cidades by Id", () => {

    let token: string | undefined = undefined
    
    beforeAll(async () => {
        let userData = {
            "email": `${new Date()}@gmail.com`,
            "nome": "Testador",
            "senha": "senha123"
        }

        await testServer.post("/usuarios").send(userData)

        console.log("user:", (await testServer.post("/usuarios").send(userData)).body )

        const response = await testServer.post("/login").send({
            email: userData.email,
            senha: userData.senha
        })

        token = response.body.token
    })

    it("should successfully Update cidades by Id", async () => {
        const res = await testServer
        .post("/cidades")
        .set({authorization:token})
        .send({
            nome: "Picos"
        })

        const id = res.body.id
        const data = {
            nome: "teste"
        }

        let response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send(data)
        expect(response.statusCode).toBe(statusCodes.OK)
    });

    it("should fail to Update cidades by Id, when id cidade is not found", async () => {
        const id = 100
        const data = {
            nome: "teste"
        }

        let response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send(data)
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND)
    });

    it("should fail to Update cidades by Id, when is invalid or miss data", async () => {
        const id = 1
        const data = {
            nome: "te"
        }

        let response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send(data)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.nome")

        response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send({})
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.nome")

    });

    it("should fail to Update cidades by Id, when id is not positive number", async () => {
        let id: string | number = "teste"
        const data = {
            nome: "teste"
        }

        let response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send(data)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

        id = -1

        response =  await testServer.put("/cidades/" + id )
        .set({authorization:token})
        .send(data)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")
    });

    
});
