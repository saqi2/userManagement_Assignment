import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/app.config';
import { JWTService } from 'src/infrastructure/jwt/jwt.service';


@Module({
  imports: [ JwtModule.register({
    secret: jwtConfig.jwtSecret,
    signOptions: { expiresIn: jwtConfig.expiresIn },
  }) ],
  providers: [ JWTService ],
  exports: [ JWTService ],
})
export class JWTModule {}
