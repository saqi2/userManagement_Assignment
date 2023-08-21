import { HttpStatus } from '@nestjs/common';
import { ValidationErrorItem } from 'sequelize';
import { QueryBuilder } from 'src/infrastructure/database/base_db/postgres/utils/QueryBuilder';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
export abstract class AbstractEntityRepository<T> {
  filterTypes = {};

  constructor (public readonly model) {}

  create: (data) => Promise<T> = (data) => {
    return this.model.create(data).catch(this.errorHandler);
  };

  createMany: (data) => Promise<T> = (data) => {
    return this.model.bulkCreate(data).catch(this.errorHandler);
  };

  update: (modification, criteria) => Promise<T> = (modification, criteria) => {
    criteria = this.formatCriteria(criteria || {}, this.filterTypes);

    const query = QueryBuilder.forOne({ criteria });

    return this.model
      .update(modification, query.criteria())
      .catch(this.errorHandler);
  };

  findOne: (query, options?, queryEntityRelations?) => Promise<T>
  = ({ criteria }, options, queryEntityRelations) => {
    criteria = this.formatCriteria(criteria || {}, this.filterTypes);

    const query = QueryBuilder.forOne({ criteria }, options);

    return this.model.findOne(query.criteria(queryEntityRelations)).then(data => {
      return this._removeDataValues(data);
    })
      .catch(this.errorHandler);
  };

  findAndCountAll: (criteria, options?, queryEntityRelations?) => Promise<ListOutPut<T>> =
   (criteria, options, queryEntityRelations) => {
     criteria = this.formatCriteria(criteria || {}, this.filterTypes);

     const query = QueryBuilder.forList({ criteria }, options);

     return this.model
       .findAndCountAll(query.criteria(queryEntityRelations)).then(data => {
         if (data.count) {
           const { count, rows } = data;
           const tempRows = [];
           rows.map(row => {
             const modifiedRow = this._removeDataValues(row);
             tempRows.push(modifiedRow);
           });
           return { count, rows: tempRows };
         }
       })
       .catch(this.errorHandler);
   };
   findAll: (criteria, options?, queryEntityRelations?) => Promise<T[]> =
   (criteria, options, queryEntityRelations) => {
     criteria = this.formatCriteria(criteria || {}, this.filterTypes);

     const query = QueryBuilder.forList({ criteria }, options);

     return this.model
       .findAll(query.criteria(queryEntityRelations)).then(data => {
         if (data.length) {
           const tempRows = [];
           data.map(row => {
             const modifiedRow = this._removeDataValues(row);

             tempRows.push(modifiedRow);
           });
           return tempRows;
         }
       })
       .catch(this.errorHandler);
   };
  destroy: (criteria) => Promise<boolean> = (criteria) => {
    criteria = this.formatCriteria(criteria || {}, this.filterTypes);

    const query = QueryBuilder.forOne({ criteria });

    return this.model
      .destroy(query.criteria())
      .then((data: number) => {
        return !!data;
      })
      .catch(this.errorHandler);
  };
  formatCriteria = (criteria, filterTypes) => {
    return criteria ?
      Object.entries(criteria).map(([ key, value ]) => [
        key,
        filterTypes[key],
        value,
      ]) :
      [];
  };

  errorHandler = async (err) => {
    console.log('error', err);

    const { errors } = err;

    if (errors[0] instanceof ValidationErrorItem) {
      const { validatorKey, path: param } = errors[0];
      const message = `${this.model.name}.validation.${param}.${validatorKey}`;

      throw new ErrorCreator([ { param, message } ], HttpStatus.BAD_REQUEST);
    }
  };

  private _removeDataValues (data) {
    for (const key in data) {
      if (data[key]) {
        if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
          if (key === 'dataValues') {
            this._removeDataValues(data.dataValues);
            return data.dataValues;
          } else if (data[key].dataValues) {
            data[key] = data[key].dataValues;
          }
        }
      }
    }
  }
}
