import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Create pessoas", () => {
    let cidadeId: number | undefined= undefined
    beforeAll(async () => {
        const insertCidade =  await testServer
        .post("/cidades")
        .send({
            nome: "Picos"
        })

        cidadeId =  insertCidade.body.id
    })

    it("should successfully create a new pessoa", async () => {
        const data = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: cidadeId
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new pessoa when required fields are missing", async () => {        
        const data= {
            email: "testador@gmail.com",
            cidadeId: cidadeId
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body")
    });

    it("should fail to create a new pessoa when cidadeId does not exist", async () => {
      
        const data = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: 9999
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
        
    });

    it("should fail to create a new pessoa when email already registed", async () => {
              
        const data = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: cidadeId
        }

        let response =  await testServer.post("/pessoas").send(data)

        response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
    });
});
