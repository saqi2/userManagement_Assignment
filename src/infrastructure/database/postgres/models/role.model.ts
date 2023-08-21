import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';

@Table({
  timestamps: true,
  tableName: 'roles',
})
export class Role extends Model<Role> {
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
  })
  title: string;


  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isHardCoded: boolean;


  @Column({
    type: DataType.STRING(200),
  })
  searchTitle: string;


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


  @HasMany(() => UserRole)
  userRole: UserRole

  @HasMany(() => RoleAction)
  roleAction: RoleAction
}
