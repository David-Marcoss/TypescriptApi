import { IPessoas } from "../../src/server/database/models";
import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("Update pessoas by Id", () => {
    it("should successfully Update pessoas by Id", async () => {
        const insertCidade =  await testServer
            .post("/cidades")
            .send({
                nome: "Picos"
            })
        
        const insertPessoa:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        const res =  await testServer.post("/pessoas").send(insertPessoa)

        const id = res.body.id
        const updatePessoa:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador update",
            email: "testadorUpdate@gmail.com",
            cidadeId: insertCidade.body.id
        }

        let response =  await testServer.put("/pessoas/" + id ).send(updatePessoa)
        expect(response.statusCode).toBe(statusCodes.OK)
    });

    it("should fail to Update pessoas by Id, when id cidade is not found", async () => {
        const id = 999
        const data:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador update",
            email: "testador@gmail.com",
            cidadeId: 999
        }

        let response =  await testServer.put("/pessoas/" + id ).send(data)
        expect(response.statusCode).toBe(statusCodes.NOT_FOUND)
    });

    it("should fail to Update pessoas by Id, when is invalid or miss data", async () => {
        const insertCidade =  await testServer
            .post("/cidades")
            .send({
                nome: "Picos"
            })
        
        const insertPessoa:Omit<IPessoas,"id"> = {
            nomeCompleto: "testador junior",
            email: "testador@gmail.com",
            cidadeId: insertCidade.body.id
        }

        const res =  await testServer.post("/pessoas").send(insertPessoa)

        const id = res.body.id
        const updatePessoa = {
            nomeCompleto: "testador update",
            email: "testador@gmail.com",
            cidadeId: "invlido"
        }

        let response =  await testServer.put("/pessoas/" + id ).send(updatePessoa)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros")

        response =  await testServer.put("/pessoas/" + id ).send({})
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.body")

    });

    it("should fail to Update pessoas by Id, when id is not positive number", async () => {
        let id: string | number = "teste"
        const data = {
            nome: "teste"
        }

        let response =  await testServer.put("/pessoas/" + id ).send(data)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")

        id = -1

        response =  await testServer.put("/pessoas/" + id ).send(data)
        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.params.id")
    });

    
});
