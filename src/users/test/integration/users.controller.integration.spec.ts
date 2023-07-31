import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';
import * as request from 'supertest';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  //   do some cleanup work

  afterAll(async () => {
    app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const createUserRequest: CreateUserDto = {
        email: userStub().email,
        age: userStub().age,
      };
      const response = await request(httpServer)
        .post('/users')
        .send(createUserRequest);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection
        .collection('users')
        .findOne({ email: createUserRequest.email });

      expect(user).toMatchObject(createUserRequest);
    });
  });
});
