import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { JWTService } from 'src/infrastructure/jwt/jwt.service';
import { CacheService } from 'src/infrastructure/cache/cache.service';
import { publicRoutes } from './publicRoutes';


@Injectable()
export class Authorization implements NestMiddleware {
  constructor (
    private readonly jwtService: JWTService,
    private readonly redis: CacheService,
  ) {}
  async use (req: NewRequest, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.baseUrl;

    if (publicRoutes.includes(url)) {
      next();
      return;
    }

    if (req.headers.authorization) {
      const payload = await this.jwtService.jwtTokenDeserializer(
        req.headers.authorization,
      );

      req.user = { id: payload.id };

      const actions = await this.redis.getRedisData(payload.id);

      for (let i = 0; i < actions?.length; i++) {
        if (actions[i].isActive) {
          if (actions[i].isParam) {
            if (url.match(actions[i].completePath) && actions[i].method === method) {
              return next();
            }
          } else if (actions[i].completePath === url && actions[i].method === method) {
            return next();
          }
        }


        this._errorHandler();
      }
    } else {
      this._errorHandler();
    }

    next();
  }

  private _errorHandler (err?) {
    throw new ErrorCreator(
      [ { message: 'generic.unauthorized' } ],
      HttpStatus.UNAUTHORIZED,
    );
  }
}
