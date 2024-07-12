import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Create pessoas", () => {

    let cidadeId: number | undefined= undefined
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

        const insertCidade =  await testServer
        .post("/cidades")
        .set({authorization:token})
        .send({
            nome: "Picos"
        })
        cidadeId =  insertCidade.body.id
        
    })

    it("should successfully create a new pessoa", async () => {
        const data = {
            nomeCompleto: "testador junior",
            email: new Date() + "@gmail.com",
            cidadeId: cidadeId
        }

        const response =  await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new pessoa when required fields are missing", async () => {        
        const data= {
            email: new Date() + "@gmail.com",
            cidadeId: cidadeId
        }

        const response =  await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body")
    });

    it("should fail to create a new pessoa when cidadeId does not exist", async () => {
      
        const data = {
            nomeCompleto: "testador junior",
            email: new Date() + "@gmail.com",
            cidadeId: 9999
        }

        const response =  await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
        
    });

    it("should fail to create a new pessoa when email already registed", async () => {
              
        const data = {
            nomeCompleto: "testador junior",
            email: new Date() + "@gmail.com",
            cidadeId: cidadeId
        }

        let response =  await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)

        response =  await testServer.post("/pessoas")
        .set({authorization:token})
        .send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
    });
});
