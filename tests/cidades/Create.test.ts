import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Create Cidades", () => {
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

    it("should successfully create a new cidade", async () => {
        const response =  await testServer
        .post("/cidades")
        .set({authorization:token})
        .send({
            nome: "Picos"
        })

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new cidade when required fields are missing", async () => {
        const response =  await testServer
        .post("/cidades")
        .set({authorization:token})
        .send({
            nome: "Pi"
        })

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.nome")
    });

    
});
