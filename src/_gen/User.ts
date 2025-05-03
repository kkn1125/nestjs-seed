import { ApiProperty } from '@nestjs/swagger';

import { Profile } from './Profile';
import { UserSecret } from './UserSecret';

export class User {
  @ApiProperty({ type: Number })
  id!: number;
  @ApiProperty({ type: String })
  email!: string;
  @ApiProperty({ type: String })
  username!: string;
  @ApiProperty({ type: Boolean })
  
  @ApiProperty({ type: Number })
  role!: number;
  @ApiProperty({ type: Number })
  state!: number;
  @ApiProperty({ type: Date })
  createdAt!: Date;
  @ApiProperty({ type: Date })
  updatedAt!: Date;
  @ApiProperty({ type: Date })
  deletedAt!: Date | null;
  @ApiProperty({ type: Date })
  lastLoginAt!: Date | null;
  @ApiProperty({ type: () => Profile })
  profile!: Profile | null;
  @ApiProperty({ type: () => UserSecret })
  userSecret!: UserSecret | null;
}
