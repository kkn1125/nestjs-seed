import { User } from '@/_gen/User';

type ExcludeUserProperties =
  | 'id'
  | 'salt'
  | 'iteration'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'lastLogin'
  | 'profile'
  | 'boards'
  | 'comments';

export class CreateUserDto implements Omit<User, ExcludeUserProperties> {
  email!: string;
  username!: string;
  password!: string;
  role!: number;
  state!: number;
}
