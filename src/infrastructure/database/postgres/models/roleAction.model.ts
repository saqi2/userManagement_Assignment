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
  Index,
} from 'sequelize-typescript';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';

@Table({
  timestamps: true,
  tableName: 'roleActions',
})
export class RoleAction extends Model<RoleAction> {
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


  @BelongsTo(() => Action, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  action: Action

  @Index('ACTION-ID-INDEX')
  @ForeignKey(() => Action)
  @Column
  actionId: number


  @BelongsTo(() => Role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: Role

  @Index('ROLE-ID-INDEX')
  @ForeignKey(() => Role)
  @Column
  roleId: number
}
