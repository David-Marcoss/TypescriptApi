import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("login usuarios", () => {
    
    let userData = {
        "email": `${new Date()}@gmail.com`,
        "nome": "Testador",
        "senha": "senha123"
    }
    
    beforeAll(async () => {
        await testServer.post("/usuarios").send(userData)
    })
    
    it("should successfully login", async () => {
        const data = {
            "email": userData.email,
            "senha": userData.senha
        }

        const response =  await testServer.post("/login").send(data)

        expect(response.statusCode).toBe(statusCodes.OK)
        expect(response.body).toHaveProperty("token")
    });

    it("should fail to login when required fields are missing", async () => {        
        const data = {
            "email": userData.email,
        }

        const response =  await testServer.post("/login").send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.senha")
    });


    it("should fail to login when credentials are invalids", async () => {
              
        const data = {
            "email": "testador@gmail.com",
            "nome": "Testador",
            "senha": "senha123"
        }

        let response =  await testServer.post("/login").send(data)

        response =  await testServer.post("/login").send(data)

        expect(response.statusCode).toBe(statusCodes.UNAUTHORIZED)
    });
});
