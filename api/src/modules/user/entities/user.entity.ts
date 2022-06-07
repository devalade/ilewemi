import { Entity, Column, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { Model } from '@Modules/common/model.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  PARENT = 'parent',
}

@Entity('user')
export class UserEntity extends Model {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARENT,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Exclude({ toPlainOnly: true })
  @Column({ unique: true, nullable: true, name: 'refresh_token_hash' })
  refreshTokenHash: string;

  async comparePassword(incomePassowrd: string) {
    return await argon2.verify(this.password, incomePassowrd);
  }

  async compareRefreshTokenshash(incomeRefreshToken: string) {
    return await argon2.verify(this.refreshTokenHash, incomeRefreshToken);
  }
}
