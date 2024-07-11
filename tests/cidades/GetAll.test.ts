import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("GetAll Cidades", () => {
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


    it("should successfully GetAll cidades", async () => {
        let response =  await testServer.get("/cidades")
            .set("authorization", `${token}`)
            .send()
        
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?filter=picos").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?limit=10").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?page=2").send()
        expect(response.statusCode).toBe(statusCodes.OK)

    });

    it("should fail to GetAll cidades when a query params are invalid", async () => {
        
        let response =  await testServer
            .get("/cidades"+ "?limit=10d")
            .set("Authorization", `${token}`)    
            .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.limit")

        response =  await testServer.get("/cidades"+ "?page=10d").send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.page")

    });

    
});
