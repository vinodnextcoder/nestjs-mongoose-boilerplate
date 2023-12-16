import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


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
      let response = { access_token: "s" };
      const createSpy = jest
        .spyOn(service, "signIn")
        .mockResolvedValueOnce(response);
      await controller.signIn(mockUserRequest);
      expect(createSpy).toHaveBeenCalled();
    });

  });
});
