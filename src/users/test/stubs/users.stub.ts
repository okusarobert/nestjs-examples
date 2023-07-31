import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '1234',
    email: 'test@example.com',
    age: 23,
    favoriteFoods: ['akokor', 'pizza'],
  };
};
