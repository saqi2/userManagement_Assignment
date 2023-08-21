import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Unique,
  NotNull,
} from 'sequelize-typescript';
import { User } from 'src/infrastructure/database/postgres/models/user.model';


@Table({
  timestamps: true,
  tableName: 'userKYCs',
})
export class UserKYC extends Model<UserKYC> {
  @NotNull
  @AllowNull(false)
  @ForeignKey(() => User)
  @Unique
  @Column({
    type: DataType.BIGINT,
  })
  userId: number;

  @NotNull
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.BIGINT,
  })
  serviceId: number;

  @AllowNull
  @Default(null)
  @Column({
    type: DataType.STRING(500),
  })
  documentPath: string;

  @NotNull
  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDocumentAccepted: boolean;

  @NotNull
  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isDone: boolean;

  @NotNull
  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isAccepted: boolean;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @AllowNull
  @Column({
    type: DataType.BIGINT,
  })
  createdBy: number;

  @Column({
    type: DataType.BIGINT,
  })
  updatedBy: number;

  @AllowNull
  @Column({
    type: DataType.STRING(15),
  })
  userIp: string

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User
}
