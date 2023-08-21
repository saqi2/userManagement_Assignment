import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from 'src/application/auth/auth.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoleModule } from 'src/application/role/role.module';
import { UserRoleModule } from 'src/application/role-user/user-role.module';
import { MenuModule } from 'src/application/menu/menu.module';
import { ActionModule } from 'src/application/action/action.module';
import { RoleActionModule } from 'src/application/role-action/role-action.module';
import { Authorization } from 'src/shared/middlewares/authorization.middleware';
import { UserKYCModule } from 'src/application/userKYC/userKYC.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from 'config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ appConfig ],
      envFilePath: [ '.env' ],
    }),
    SharedModule,
    InfrastructureModule,
    AuthModule,
    RoleModule,
    UserRoleModule,
    MenuModule,
    ActionModule,
    RoleActionModule,
    UserKYCModule,
  ],
  providers: [ Logger, Authorization ],
})
export class AppModule {
  configure (consumer: MiddlewareConsumer) {
    // Authorization
    consumer.apply(Authorization).forRoutes('*');
  }
}
