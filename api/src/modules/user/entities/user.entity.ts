import { Entity, Column, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';
import { Model } from '@Modules/common/model.entity';

export enum UserRole {
  PRINCIPAL = 'principal',
  SECRETARY = 'secretary',
  PREFECT = 'prefect',
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

  @Column({ unique: true, name: 'phone_number' })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PARENT,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  @Column()
  password: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ unique: true, nullable: true, name: 'refresh_token_hash' })
  refreshTokenHash: string;

  async comparePassword(incomePassowrd: string) {
    return await argon2.verify(this.password, incomePassowrd);
  }

  async compareRefreshTokenshash(incomePassowrd: string) {
    return await argon2.verify(this.refreshTokenHash, incomePassowrd);
  }
}
