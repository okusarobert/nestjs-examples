import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/users.stub';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.getUser(userStub().userId);
      });

      test('then it should call user service', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          age: userStub().age,
        };
        user = await usersController.createUser(createUserDto);
      });

      test('then it should call user service', () => {
        expect(usersService.createUser).toBeCalledWith(
          createUserDto.email,
          createUserDto.age,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;
      beforeEach(async () => {
        updateUserDto = {
          age: 90,
          favoriteFoods: ['atap', 'akinei'],
        };
        user = await usersController.updateUser(userStub().userId, userStub());
      });

      test('then it should call user service', () => {
        expect(usersService.updateUser).toBeCalledWith(
          userStub().userId,
          updateUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
