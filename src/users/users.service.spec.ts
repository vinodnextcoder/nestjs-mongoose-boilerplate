// import { getModelToken } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { UserService } from './users.service';
// import { User } from './schemas/user.schema';

// const mockCat = {
//   name: 'Cat #1',
//   breed: 'Breed #1',
//   age: 4,
// };

// describe('CatsService', () => {
//   let service: UserService;
//   let model: Model<User>;

//   const catsArray = [
//     {
//       name: 'Cat #1',
//       breed: 'Breed #1',
//       age: 4,
//     },
//     {
//       name: 'Cat #2',
//       breed: 'Breed #2',
//       age: 2,
//     },
//   ];

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getModelToken('Cat'),
//           useValue: {
//             new: jest.fn().mockResolvedValue(mockCat),
//             constructor: jest.fn().mockResolvedValue(mockCat),
//             find: jest.fn(),
//             create: jest.fn(),
//             exec: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     model = module.get<Model<User>>(getModelToken('Cat'));
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should return all cats', async () => {
//     jest.spyOn(model, 'find').mockReturnValue({
//       exec: jest.fn().mockResolvedValueOnce(catsArray),
//     } as any);
//     const cats = await service.findAll();
//     expect(cats).toEqual(catsArray);
//   });

//   it('should insert a new cat', async () => {
//     jest.spyOn(model, 'create').mockImplementationOnce(() =>
//       Promise.resolve({
//         name: 'Cat #1',
//         breed: 'Breed #1',
//         age: 4,
//       } as any),
//     );
//     const newCat = await service.create({
//       // name: 'Cat #1',
//       breed: 'Breed #1',
//       age: 4,
//     });
//     expect(newCat).toEqual(mockCat);
//   });
// });
