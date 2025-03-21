import { UserRole } from '@common/enums/UserRole';
import { UserState } from '@common/enums/UserState';

export declare global {
  type LoginResponseData = {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    state: UserState;
  };
  interface UserTokenData extends LoginResponseData {
    iat: number;
    exp: number;
  }

  namespace Express {
    interface Request {
      user: UserTokenData;
      redisToken: string;
    }
  }

  type SelectUserKeys =
    | 'id'
    | 'username'
    | 'email'
    | 'role'
    | 'state'
    | 'createdAt';
}

declare module 'express' {
  interface Request {
    user: UserTokenData;
  }
}
