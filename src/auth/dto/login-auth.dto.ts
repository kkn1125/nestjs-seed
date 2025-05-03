import { User } from '@prisma/client';

type ExcludeLoginProperties =
  | 'isEmailConfirmed'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt';

export class LoginAuthDto implements Omit<User, ExcludeLoginProperties> {
  id!: number;
  email!: string;
  username!: string;
  role!: number;
  state!: number;
  lastLoginAt!: Date | null;
}
