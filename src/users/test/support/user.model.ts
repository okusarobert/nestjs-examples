import { User } from 'src/users/schemas/user.schema';
import { MockModel } from '../../../database/test/support/mock.model';
import { userStub } from '../stubs/users.stub';
export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
