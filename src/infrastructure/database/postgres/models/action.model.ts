import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  createIndexDecorator,
  HasMany,
} from 'sequelize-typescript';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';

const ActionIndex = createIndexDecorator({
  // index options
  name: 'action-index',
  parser: 'my-parser',
  type: 'UNIQUE',
  unique: true,
  concurrently: true,
  using: 'BTREE',
});

@Table({
  timestamps: true,
  tableName: 'actions',
})
export class Action extends Model<Action> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
  })
  completePath: string;


  @Column({
    type: DataType.SMALLINT,
  })
  minimumKYCLevel: number;


  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isParam: boolean;


  @Column({
    type: DataType.STRING(15),
  })
  userIp: string

  @Column({
    type: DataType.ENUM('GET', 'POST', 'PATCH', 'DELETE', 'PUT'),
  })
  method: string

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

  @AllowNull(true)
  @UpdatedAt
  @Column
  updatedAt: Date;


  @BelongsTo(() => Menu, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  menu: Menu

  // @ActionIndex
  @ForeignKey(() => Menu)
  @Column
  menuId: number


  // @ActionIndex
  @Column({
    type: DataType.BIGINT,
  })
  actionTypeId:number // todo fix actionTypeId 

  @HasMany(() => RoleAction)
  roleAction: RoleAction
}
