import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
  AllowNull,
  createIndexDecorator,
  HasMany,
} from 'sequelize-typescript';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';


const ShowIndex = createIndexDecorator({
  // index options
  name: 'show-index',
  parser: 'my-parser',
  type: 'UNIQUE',
  unique: true,
  concurrently: true,
  using: 'BTREE',
});

@Table({
  timestamps: true,
  tableName: 'menus',
})
export class Menu extends Model<Menu> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
  })
  title: string;


  @Column({
    type: DataType.STRING(400),
  })
  generalPath: string;

  @ShowIndex
  @Column({
    type: DataType.SMALLINT,
  })
  showPriority: number;

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

  @AllowNull(true)
  @UpdatedAt
  @Column
  updatedAt: Date;

  @ShowIndex
  @Column({
    type: DataType.INTEGER,
  })
  parentId: number;


  @HasMany(() => Action)
  menu: Action
}
