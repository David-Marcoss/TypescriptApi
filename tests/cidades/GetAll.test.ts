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

        console.log("user:", (await testServer.post("/usuarios").send(userData)).body )

        const response = await testServer.post("/login").send({
            email: userData.email,
            senha: userData.senha
        })

        console.log("res:", response.body)

        token = response.body.token
    })


    it("should successfully GetAll cidades", async () => {
        let response =  await testServer
            .get("/cidades")
            .set({authorization: token})
            .send()
        
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer
            .get("/cidades"+ "?filter=picos")
            .set({authorization: token})
            .send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer
            .get("/cidades"+ "?limit=10")
            .set({authorization: token})
            .send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer
            .get("/cidades"+ "?page=2")
            .set({authorization: token})
            .send()
        expect(response.statusCode).toBe(statusCodes.OK)

    });

    it("should fail to GetAll cidades when a query params are invalid", async () => {
        
        let response =  await testServer
            .get("/cidades"+ "?limit=10d")
            .set("Authorization", `${token}`)    
            .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.limit")

        response =  await testServer
            .get("/cidades"+ "?page=10d")
            .set({authorization: token})
            .send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.page")

    });

    
});
