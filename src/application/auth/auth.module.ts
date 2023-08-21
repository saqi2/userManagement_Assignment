import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/auth/auth.service';
import { AuthController } from 'src/application/auth/auth.controller';
import { UserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/shared/passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/passport/jwt.strategy';
import { GoogleStrategy } from 'src/shared/passport/google.strategy';
import { RoleActionRepository } from 'src/infrastructure/database/postgres/repositories/roleAction.repository';
import { UserRoleRepository } from 'src/infrastructure/database/postgres/repositories/userRole.repository';
import { CacheModule } from 'src/infrastructure/cache/cache.module';
import { JWTService } from 'src/infrastructure/jwt/jwt.service';
import { JWTModule } from 'src/infrastructure/jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ User ]),
    PassportModule,
    CacheModule,
    JWTModule,
  ],
  controllers: [ AuthController ],
  providers: [
    AuthService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    RoleActionRepository,
    UserRoleRepository,
  ],
  exports: [ UserRepository ],
})
export class AuthModule {}
