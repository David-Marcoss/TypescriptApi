import { IPessoas } from "../../src/server/database/models";
import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"




describe("Create pessoas", () => {
    it("should successfully create a new pessoa", async () => {
        const insertCidade =  await testServer
            .post("/cidades")
            .send({
                nome: "Picos"
            })
        
        const data:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new pessoa when required fields are missing", async () => {
        const insertCidade =  await testServer
        .post("/cidades")
        .send({
            nome: "Picos"
        })
        
        const data= {
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body")
    });

    it("should fail to create a new pessoa when cidadeId does not exist", async () => {
      
        const data:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: 9999
        }

        const response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
        
    });

    it("should fail to create a new pessoa when email already registed", async () => {
      
        const insertCidade =  await testServer
        .post("/cidades")
        .send({
            nome: "Picos"
        })
        
        const data:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        let response =  await testServer.post("/pessoas").send(data)

        response =  await testServer.post("/pessoas").send(data)

        expect(response.statusCode).toBe(statusCodes.INTERNAL_SERVER_ERROR)
        
    });
    
});
