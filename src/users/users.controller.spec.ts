import { Test, TestingModule } from '@nestjs/testing';
import jest from 'jest-mock';
import { UserController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { beforeEach } from 'node:test';

describe('Cats Controller', () => {
  let controller: UserController;
  let service: UserService;
  const createUserDto = {
    username:"1sss1",
    first_name:"test",
    last_name:"test",
    password:"Sairam1@",
    password_reset_code:"1",
    email:"te@test.com",
    email_code:"eee"
}

 
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UserController],
  //     providers: [
  //       {
  //         provide: UserService,
  //         useValue: {
  //           findAll: jest.fn().mockResolvedValue([
  //             {
  //               name: 'Cat #1',
  //               breed: 'Bread #1',
  //               age: 4,
  //             },
  //             {
  //               name: 'Cat #2',
  //               breed: 'Breed #2',
  //               age: 3,
  //             },
  //             {
  //               name: 'Cat #3',
  //               breed: 'Breed #3',
  //               age: 2,
  //             },
  //           ]),
  //           create: jest.fn().mockResolvedValue(CreateUserDto),
  //         },
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<UserController>(UserController);
  //   service = module.get<UserService>(UserService);
  // });

  describe('create()', () => {
    it('should create a new cat', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCat);

      await controller.create(CreateUserDto,ressponse);
      expect(createSpy).toHaveBeenCalledWith(CreateUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Cat #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Cat #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Cat #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
