import request from "supertest";
import app from "../controller/server";
import {UserModel} from "../model/use.model";
import { NextFunction } from "express";

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

describe("Test create user", () => {
    it("test done", async () => {
        jest.spyOn(UserModel.prototype, 'save')
            .mockImplementationOnce(()=>Promise.resolve());
        const mockRequest: any = {
            body: {
                username: "test",
                password: "123456"
            }
        };

        const mockResponse: any = {
            status: jest.fn(),
            json: jest.fn(),
        };

        const mockNext: NextFunction = jest.fn();
        await createUser(mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

})
