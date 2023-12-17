import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MockResponse, createResponse } from "node-mocks-http";
import { Response } from "express";


describe("User Controller", () => {
  let controller: AuthController;
  let service: AuthService;
  const mockUserRequest = {
    password: "Sairam1@",
    email: "te@test.com"
  };
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(true)
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });


  describe("auth controller ()", () => {

    it("should create access token", async () => {
      let response1: MockResponse<Response> = createResponse();
      response1.json = jest.fn();
      response1.cookie = jest.fn();
      let response = { access_token: "s" };
      const createSpy = jest
        .spyOn(service, "signIn")
        .mockResolvedValueOnce(response);
      await controller.signIn(mockUserRequest,response1);
      expect(createSpy).toHaveBeenCalled();
    });

  });
});
