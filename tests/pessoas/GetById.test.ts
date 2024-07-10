import { IPessoas } from "../../src/server/database/models";
import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Get pessoas by Id", () => {
    it("should successfully Get pessoas by Id", async () => {
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

        const res =  await testServer.post("/pessoas").send(data)

        const id = res.body.id

        let response =  await testServer.get("/pessoas/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.OK)
    });

    it("should fail to Get pessoas by Id, when id cidade is not found", async () => {
        const id = 9999

        let response =  await testServer.get("/pessoas/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND)
    });

    it("should fail to Get pessoas by Id, when id is not positive number", async () => {
        let id: string | number = "teste"

        let response =  await testServer.get("/pessoas/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

        id = -1

        response =  await testServer.get("/pessoas/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

    });

    
});
