import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';


@Injectable()
export class JWTService {
  constructor (private readonly jwtService: JwtService) {}


  async jwtTokenDeserializer (token: string) {
    const splittedToken = token.split(' ');

    try {
      return this.jwtService.verify(splittedToken[1]);
    } catch (err) {
      this._errorHandler(err);
    }
  }

  sign (payload) {
    return this.jwtService.sign(payload);
  }


  private _errorHandler (err) {
    throw new ErrorCreator(
      [ { message: 'generic.unauthorized' } ],
      HttpStatus.UNAUTHORIZED,
    );
  }
}
