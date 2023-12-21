import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MockResponse, createResponse } from "node-mocks-http";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";

describe("User Controller", () => {
  let controller: AuthController;
  let service: AuthService;
  const mockUserRequest = {
    password: "Sairam1@",
    email: "te@test.com",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              access_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
              refresh_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe("auth controller ()", () => {
    it("should create access token", async () => {
      let mockResponse: MockResponse<Response> = createResponse();
      mockResponse.json = jest.fn();
      mockResponse.cookie = jest.fn();
      const expectedResponse = {
        access_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
        refresh_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
      };
      const createSpy = jest
        .spyOn(service, "signIn")
        .mockResolvedValueOnce(expectedResponse);
      await controller.signIn(mockUserRequest, mockResponse);
      expect(createSpy).toHaveBeenCalled();
    });
  });
});
