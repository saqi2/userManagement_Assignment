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
} from 'sequelize-typescript';
import { User } from 'src/infrastructure/database/postgres/models/user.model';


  @Table({
    timestamps: true,
    tableName: 'userWallets',
    updatedAt: 'editDate',
    createdAt: 'creationDate',
  })
export class UserWallet extends Model<UserWallet> {
    @AllowNull(false)
    @Default(0)
    @Column({
      type: DataType.DECIMAL(34, 10),
    })
    walletBalance: number;

    @AllowNull(false)
    @Default(true)
    @Column({
      type: DataType.BOOLEAN,
    })
    isActive: boolean;

    @AllowNull(false)
    @Column({
      type: DataType.BIGINT,
    })
    creatorUser: number;

    @Column({
      type: DataType.BIGINT,
    })
    editorUser: number;

    @AllowNull(false)
    @Column({
      type: DataType.STRING(15),
    })
    userIp: string

    @ForeignKey(() => User)
    @Unique(true)
    @Column
    userId: number

    // TODO add ForeignKey

    //  @ForeignKey(() => ?)
    //  @Unique(true)
    //  @Column
    //  walletTypeId: number

    //  @ForeignKey(() => ?)
    //  @Unique(true)
    //  @Column
    //  currencyWalletTypeId: number

    @BelongsTo(() => User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
      user: User
}
