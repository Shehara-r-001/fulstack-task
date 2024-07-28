import { users } from 'src/app/shared/data/users';

export const UsersProvider = {
  provide: 'USERS',
  useValue: users,
};
