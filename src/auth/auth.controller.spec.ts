import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MockResponse, createResponse } from "node-mocks-http";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";

describe("Auth Controller", () => {
  let controller: AuthController;
  let service: AuthService;
  const mockUserRequest = {
    password: "Password1@",
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
        JwtService 
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe("signIn", () => {
    it("should create access token and set cookies", async () => {
      const mockResponse: MockResponse<Response> = createResponse();
      mockResponse.json = jest.fn();
      mockResponse.cookie = jest.fn();

      await controller.signIn(mockUserRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "SUCCESS",
        isSuccess: true,
        statusCode:200,
        data: null,
      });

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'eyJhbGciOiJIUzI1NiJ9.sss.aaaaa',
        expect.objectContaining({
          httpOnly: true,
          expires: expect.any(Date),
          path: '/',
          sameSite: 'none',
          secure: true,
        })
      );

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'eyJhbGciOiJIUzI1NiJ9.sss.aaaaa',
        expect.objectContaining({
          httpOnly: true,
          expires: expect.any(Date),
          path: '/',
          sameSite: 'none',
          secure: true,
        })
      );
    });

    it("should call the service's signIn method", async () => {
      const mockResponse: MockResponse<Response> = createResponse();
      mockResponse.json = jest.fn();
      mockResponse.cookie = jest.fn();

      const signInSpy = jest.spyOn(service, "signIn");

      await controller.signIn(mockUserRequest, mockResponse);

      expect(signInSpy).toHaveBeenCalledWith("te@test.com", "Password11@");
    });
  });
});