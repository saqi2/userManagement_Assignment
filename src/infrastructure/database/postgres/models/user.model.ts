import { DataTypes } from 'sequelize';
import { Table, Column, Model, BeforeSave, HasMany } from 'sequelize-typescript';
import { UserKYC } from 'src/infrastructure/database/postgres/models/userKYC.model';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { UserWallet } from 'src/infrastructure/database/postgres/models/userWallet.model';
import { Bcrypt } from 'src/shared/helper/bcrypt';

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({ allowNull: false, type: DataTypes.STRING(200), validate: { trim: true } })
  fullName: string;

  @Column({ unique: true, allowNull: false, type: DataTypes.STRING(100), validate: { trim: true } })
  email: string;

  @Column({ unique: true, allowNull: false, type: DataTypes.STRING(20), validate: { trim: true } })
  cellPhone: string;


  @Column({ allowNull: false, type: DataTypes.STRING(255), validate: { trim: true } })
  password: string;

  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  isSuperAdmin: boolean

  @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
  isLocalService: boolean

  @Column({ type: DataTypes.STRING(1000), defaultValue: null, validate: { trim: true } })
  localServiceToken: string;

  @Column({ type: DataTypes.STRING(100), defaultValue: null, validate: { trim: true } })
  localServiceUserName: string;

  @Column({ type: DataTypes.STRING(100), defaultValue: null, validate: { trim: true } })
  localServicePassword: string;

  @Column({ type: DataTypes.BOOLEAN, defaultValue: true })
  isActive: boolean

  @Column({ type: DataTypes.BIGINT, defaultValue: null })
  createdBy: number

  @Column({ type: DataTypes.BIGINT, defaultValue: null })
  updatedBy: number

  @Column({ type: DataTypes.STRING(15), defaultValue: null, validate: { trim: true } })
  userIp: string;

  @Column({ unique: true, type: DataTypes.INTEGER, defaultValue: null })
  verificationCode: number

  @Column({ type: DataTypes.DATE, defaultValue: null, validate: { trim: true } })
  expirationDate: Date

  @Column
  googleId: string


  @HasMany(() => UserRole)
  userRole: UserRole

  @HasMany(() => UserWallet)
  userWallet: UserWallet

  @HasMany(() => UserKYC)
  userKYCs: UserKYC

  @BeforeSave
  static async hashPassword (user: User) {
    if (user.password) {
      const hashedPassword = await Bcrypt.hashPassword(user.password);
      user.password = hashedPassword;
    }
  }
}
