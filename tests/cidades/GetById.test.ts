import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Get Cidades by Id", () => {
    let token: string | undefined = undefined
    
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

    it("should successfully Get cidades by Id", async () => {
        const res = await testServer
        .post("/cidades")
        .set({authorization:token})
        .send({
            nome: "Picos"
        })

        const id = res.body.id

        let response =  await testServer.get("/cidades/" + id )
        .set({authorization:token})
        .send()

        expect(response.statusCode).toBe(statusCodes.OK)
    });

    it("should fail to Get cidades by Id, when id cidade is not found", async () => {
        const id = 100

        let response =  await testServer.get("/cidades/" + id )
        .set({authorization:token})
        .send()

        expect(response.statusCode).toBe(statusCodes.NOT_FOUND)
    });

    it("should fail to Get cidades by Id, when id is not positive number", async () => {
        let id: string | number = "teste"

        let response =  await testServer.get("/cidades/" + id )
        .set({authorization:token})
        .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

        id = -1

        response =  await testServer.get("/cidades/" + id )
        .set({authorization:token})
        .send()
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

    });

    
});
