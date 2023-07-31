import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '123',
    email: 'test@example.com',
    favoriteFoods: ['pizza', 'atap', 'akokor'],
    age: 45,
  };
};
