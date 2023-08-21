import { Module } from '@nestjs/common';
import { postgresConfig } from 'src/infrastructure/database/postgres/postgres.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { LocaleModule } from 'src/infrastructure/locales/base_locale/locale.module';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { CacheModule } from './cache/cache.module';
import { JWTModule } from 'src/infrastructure/jwt/jwt.module';
import { UserWallet } from 'src/infrastructure/database/postgres/models/userWallet.model';
import { UserKYC } from 'src/infrastructure/database/postgres/models/userKYC.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...postgresConfig,
      models: [
        User,
        Role,
        UserRole,
        Menu,
        Action,
        RoleAction,
        UserWallet,
        UserKYC,
      ],
    }),
    LocaleModule,
    CacheModule,
    JWTModule,
  ],
  exports: [ JWTModule, CacheModule ],
})
export class InfrastructureModule {}
