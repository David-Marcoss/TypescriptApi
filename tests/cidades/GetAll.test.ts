import {testServer} from "../jest.setup"
import statusCodes from "http-status-codes"

describe("GetAll Cidades", () => {
    it("should successfully GetAll cidades", async () => {
        let response =  await testServer.get("/cidades").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?filter=picos").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?limit=10").send()
        expect(response.statusCode).toBe(statusCodes.OK)
        
        response =  await testServer.get("/cidades"+ "?page=2").send()
        expect(response.statusCode).toBe(statusCodes.OK)

    });

    it("should fail to GetAll cidades when a query params are invalid", async () => {
        let response =  await testServer.get("/cidades"+ "?limit=10d").send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.limit")

        response =  await testServer.get("/cidades"+ "?page=10d").send()

        expect(response.statusCode).toBe(statusCodes.BAD_REQUEST)
        expect(response.body).toHaveProperty("erros.query.page")

    });

    
});
