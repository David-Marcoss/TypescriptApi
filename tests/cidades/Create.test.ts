import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Create Cidades", () => {
    it("should successfully create a new cidade", async () => {
        const response =  await testServer
        .post("/cidades")
        .send({
            nome: "Picos"
        })

        expect(response.statusCode).toBe(statusCodes.CREATED)
        expect(response.body).toHaveProperty("id")
    });

    it("should fail to create a new cidade when required fields are missing", async () => {
        const response =  await testServer
        .post("/cidades")
        .send({
            nome: "Pi"
        })

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body.nome")
    });

    
});
