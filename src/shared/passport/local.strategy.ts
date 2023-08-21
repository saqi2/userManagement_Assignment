
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { AuthService } from 'src/application/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super();
  }

  async validate (username: string, password: string): Promise<User> {
    return this.authService.validateUserForLocalStrategy(username, password);
  }
}
