import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Create usuarios", () => {
    
    it("should successfully create a new usuario", async () => {
        const data = {
            "email": "testador@gmail.com",
            "nome": "Testador",
            "senha": "senha123"
        }

        const response =  await testServer.post("/usuarios").send(data)

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new usuario when required fields are missing", async () => {        
        const data = {
            "email": "testador@gmail.com",
            "senha": "senha123"
        }

        const response =  await testServer.post("/usuarios").send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.nome")
    });


    it("should fail to create a new usuario when email already registed", async () => {
              
        const data = {
            "email": "testador@gmail.com",
            "nome": "Testador",
            "senha": "senha123"
        }

        let response =  await testServer.post("/usuarios").send(data)

        response =  await testServer.post("/usuarios").send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
    });
});
