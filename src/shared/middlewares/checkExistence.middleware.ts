import { HttpStatus } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { ParamTypes, Params } from 'src/shared/interfaces/base_interface/Params.interface';

export const checkExistenceMiddleware =
 (repository, params: Params) => async (req: NewRequest, res: Response, next: NextFunction) => {
   let temp: number | string;

   if (Reflect.ownKeys(req.params).length) {
     if (params.paramType === ParamTypes.NUMBER) {
       temp = parseInt(req.params[params.paramName]);
     } else {
       temp = req.params[params.paramName];
     }


     const criteria = { [params.dataBaseField]: temp };
     const param: string = repository.collectionName.substr(0, repository.collectionName.length - 1);

     if (typeof temp === 'number' && !isNaN(temp)) {
       if (criteria[params.dataBaseField]) {
         const data = await repository.findOne({ criteria });

         if (!data) {
           errorHandler(param);
         }

         req.dataFromMiddleware = data;
       } else {
         errorHandler(param);
       }
     } else {
       errorHandler(param);
     }
   }


   next();
 };


function errorHandler (param: string): never {
  throw new ErrorCreator([ { message: 'generic.not_found', param } ], HttpStatus.NOT_FOUND);
}
