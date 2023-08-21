import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { User } from 'src/infrastructure/database/postgres/models/user.model';

@Table({
  timestamps: true,
  tableName: 'userRoles',
})
export class UserRole extends Model<UserRole> {
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;


  @Column({
    type: DataType.STRING(15),
  })
  userIp: string


  @Column({
    type: DataType.BIGINT,
  })
  createdBy: number;


  @Column({
    type: DataType.BIGINT,
  })
  updatedBy: number;


  @CreatedAt
  createdAt: Date;


  @UpdatedAt
  updatedAt: Date;


  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User

  @ForeignKey(() => User)
  @Column
  userId: number


  @BelongsTo(() => Role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role

  @ForeignKey(() => Role)
  @Column
  roleId: number
}
