import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("delete Cidades by Id", () => {
    it("should successfully delete cidades by Id", async () => {
        const res = await testServer
        .post("/cidades")
        .send({
            nome: "Picos"
        })

        const id = res.body.id

        let response =  await testServer.delete("/cidades/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.OK)
    });

    it("should fail to delete cidades by Id, when id cidade is not found", async () => {
        const id = 100

        let response =  await testServer.delete("/cidades/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND)
    });

    it("should fail to delete cidades by Id, when id is not positive number", async () => {
        let id: string | number = "teste"

        let response =  await testServer.delete("/cidades/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

        id = -1

        response =  await testServer.delete("/cidades/" + id ).send()
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

    });

    
});
