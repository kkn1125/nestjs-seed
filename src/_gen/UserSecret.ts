import { ApiProperty } from '@nestjs/swagger';

import { User } from './User';

export class UserSecret {
  @ApiProperty({ type: Number })
  id!: number;
  @ApiProperty({ type: Number })
  userId!: number;
  @ApiProperty({ type: String })
  password!: string;
  @ApiProperty({ type: String })
  salt!: string;
  @ApiProperty({ type: Number })
  iteration!: number;
  @ApiProperty({ type: () => User })
  user!: User;
}
