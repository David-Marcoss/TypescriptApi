import { IPessoas } from "../../src/server/database/models";
import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("GetAll pessoas", () => {
    it("should successfully GetAll pessoas", async () => {
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

        await testServer.post("/pessoas").send(data)
        
        let response =  await testServer.get("/pessoas").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?filter=testador").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?limit=10").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/pessoas"+ "?page=2").send()
        expect(response.statusCode).toBe(statusCodes.OK)

    });

    it("should fail to GetAll pessoas when a query params are invalid", async () => {
        let response =  await testServer.get("/pessoas"+ "?limit=10d").send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.limit")

        response =  await testServer.get("/pessoas"+ "?page=10d").send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.page")

    });

    
});
