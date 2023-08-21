import { HttpStatus } from '@nestjs/common';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { MongooseQuery } from 'src/infrastructure/database/base_db/mongo/utils/MongooseQuery.util';
import { createFlatObject } from 'src/infrastructure/database/base_db/mongo/utils/index';
import { CounterRepository } from 'src/infrastructure/database/base_db/mongo/repositories/Counter.repository';
export class AbstractEntityRepository<T> {
  filterTypes = {};

  nonFlatFields = [];

  possibleDuplicates = []

  outputs = {
    REPO_DUPLICATE_ERROR: 'REPO_DUPLICATE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
  };
  constructor (
    private Model,
    public CounterRepository: CounterRepository,
    private collectionName: string,
  ) {
  }

   create: (data, options?,) => Promise<T> = async (
     data,
     options,
   ) => {
     const id = await this.CounterRepository.getNext(this.collectionName);

     data._id = id;

     const query = {
       ...data,
     };

     return this.Model.create(
       query,
       options,
     ).catch(this.errorHandler);
   }

    insertMany: (data, useId: boolean, options?,) => Promise<T[]> = async (
      data,
      useId,
      options,
    ) => {
      if (useId) {
        for (const value of data) {
          const id = await this.CounterRepository.getNext(this.collectionName); // TODO remove await if its possible

          value._id = id;
        }
      }


      return this.Model.insertMany(data, options).catch(this.errorHandler);
    }

    update: (criteria, modifications, options?, operator?,) => Promise<T> = (
      criteria,
      modifications,
      options,
      operator,
    ) => {
      modifications = createFlatObject(modifications, this.nonFlatFields);

      if (operator) {
        modifications = { [operator]: modifications };
      }

      return this.Model.updateOne(
        criteria,
        modifications,
        options,
      ).then(data => {
        return this.findOne({ criteria });
      })
        .catch(this.errorHandler);
    }


    updateMany: (criteria, modifications, options?, operator?,) => Promise<T> = (
      criteria,
      modifications,
      options,
      operator,
    ) => {
      modifications = createFlatObject(modifications, this.nonFlatFields);

      if (operator) {
        modifications = { [operator]: modifications };
      }

      return this.Model.updateMany(
        criteria,
        modifications,
        options,
      ).then(data => {
        return this.findAll({ criteria });
      })
        .catch(this.errorHandler);
    }


     updateById :(id: number, modifications, options) => Promise<T> = (
       id,
       modifications,
       options,
     ) => {
       modifications = createFlatObject(modifications, this.nonFlatFields);
       return this.Model
         .updateOne(
           { _id: id },
           modifications,
           options,
         )
         .then(async () => {
           return this.findById(id);
         })
         .catch(this.errorHandler);
     }

      destroyById:(id: number, options?) => Promise<boolean> = async (id, options) => {
        const result = await this.Model.deleteOne({ _id: id }, options).catch(this.errorHandler);

        return result.deletedCount > 0;
      }

      destroyByQuery: (query, options) => Promise<boolean> = async (
        query = {},
        options,
      ) => {
        const result = await this.Model.deleteMany(query, options);
        return result.deletedCount > 0;
      }

      count: (filter) => Promise<number> = (filter) => {
        return this.Model.countDocuments(filter).catch(this.errorHandler);
      }

      findById: (id:number) => Promise<T> = (id) => {
        return this.Model.findById(id)
          .lean()
          .catch(this.errorHandler);
      }

      findOne: (query, queryEntityRelations?, customFilterTypes?,) => Promise<T> = (
        { fields, criteria },
        queryEntityRelations,
        customFilterTypes = {},
      ) => {
        criteria = this.formatCriteria(criteria || {}, {
          ...this.filterTypes,
          ...customFilterTypes,
        });


        const query = MongooseQuery.forOne(
          criteria,
        );

        return this.Model.findOne(query.criteria(queryEntityRelations))
          .select(fields)
          .lean()
          .catch(this.errorHandler);
      }


  findAndCountAll: (
    query,
    customFilterTypes?,
  )=> Promise<{rows: T[], count: number}> = async (
    { fields, criteria, limit, page, orderBy, populates },
    customFilterTypes = {},
  ) => {
    let populateCriteria = [];
    criteria = this.formatCriteria(criteria, { ...this.filterTypes, ...customFilterTypes });


    const query = MongooseQuery.forList({
      limit,
      page,
      orderBy,
      criteria,
    });

    try {
      let rows = this.Model.find(query.criteria())
        .skip(query.skip)
        .limit(query.limit)
        .sort(query.sort)
        .select(fields);

      if (populates && populates.length) {
        for (const doc of populates) {
          rows.populate(doc);

          if (doc.criteria) {
            populateCriteria = [ ...populateCriteria, ...doc.criteria ];
          }
        }
      }

      rows = await rows.lean();


      const count: number = await this.Model.countDocuments(query.criteria());
      return { rows, count };
    } catch (error) {
      return this.errorHandler(error);
    }
  };


  findAll: (query, customFilterTypes?) => Promise<T[]> =
  (
    { fields, criteria, limit, page, orderBy, populates }, customFilterTypes = {},
  ) => {
    criteria = this.formatCriteria(criteria, { ...this.filterTypes, ...customFilterTypes });


    const query = MongooseQuery.forList({
      limit,
      page,
      orderBy,
      criteria,
    });

    return this.Model.find(query.criteria())
      .skip(query.skip)
      .limit(query.limit)
      .sort(query.sort)
      .select(fields)
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


  errorHandler = async (error) => {
    if (error.code === 11000) {
      const { REPO_DUPLICATE_ERROR } = this.outputs;

      if (error.writeErrors) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          errors: this.createDuplicateError(error.writeErrors[0].err),
        };
      } else if (error.keyPattern) {
        throw {
          code: HttpStatus.BAD_REQUEST,
          errors: this.createDuplicateError(error.keyPattern),
        };
      } else {
        throw {
          ...error,
          code: REPO_DUPLICATE_ERROR,
        };
      }
    } else if (error?.errors?.version.kind === 'required') {
      console.log(error);

      throw new ErrorCreator([
        {
          param: error.errors.version.path,
          message: `${this.collectionName}.validation.${error.errors.version.path}.require`,
        },
      ]
      , HttpStatus.BAD_REQUEST);
    } else {
      throw error;
    }
  };

  createDuplicateError = (error) => {
    let errorParams;

    if ('errmsg' in error) {
      if (
        error.errmsg.includes(' index: ') &&
        error.errmsg.includes(' dup key: ')
      ) {
        const keysString = /.* index: (.*) dup key: /g.exec(error.errmsg)[1];
        errorParams = keysString.replace(/_1/g, '').split('_');
      }
    } else {
      errorParams = Object.keys(error);
    }

    const throwArray = [];

    errorParams
      .filter((param) => this.possibleDuplicates.includes(param))
      .forEach((error) => {
        throwArray.push({
          param: error,
          message: `${this.collectionName}.validation.${error}.duplicate`,
        });
      });

    throw (new ErrorCreator(throwArray, HttpStatus.BAD_REQUEST));
  };


  // aggregation = async (
  //   { criteria, limit, page, orderBy, orderType, pipeline, projections },
  //   { fromCollection = null, variables = {}, as },
  //   locale,
  //   forceTranslatedFields,
  //   customFilterTypes = {},
  // ) => {
  //   let pipelineQuery;
  //   const aggregationArray = [];
  //   criteria = this.formatCriteria(criteria, {
  //     ...this.filterTypes,
  //     ...customFilterTypes,
  //   });

  //   if (forceTranslatedFields) {
  //     criteria = [ ...criteria, ...this.getExistenceQuery() ];
  //   }

  //   const query = MongooseQuery.forList({
  //     limit,
  //     page,
  //     orderBy,
  //     orderType,
  //     criteria,
  //     filterTypes: this.filterTypes,
  //     translateFields: this.translateFields,
  //     locale,
  //   });
  //   aggregationArray.push({ $match: query.criteria() });

  //   if (fromCollection && pipeline) {
  //     pipeline = this.formatCriteria(pipeline, {
  //       ...this.aggregatePipelineTypes,
  //       ...customFilterTypes,
  //     });
  //     pipelineQuery = MongooseQuery.forOne({
  //       criteria: pipeline,
  //       translateFields: this.translateFields,
  //       locale,
  //     });
  //     aggregationArray.push({
  //       $lookup: {
  //         from: fromCollection,
  //         let: variables,
  //         pipeline: [ { $match: pipelineQuery.criteria() } ],
  //         as,
  //       },
  //     });
  //   }

  //   projections.forEach((projection) => {
  //     // each project could have its own criteria for filtering
  //     if (projection.$project && projection.$project.schema) {
  //       const criteriaForProjection = this.formatCriteria(
  //         projection.$project.schema.criteria,
  //         { ...projection.$project.schema.filterTypes, ...customFilterTypes },
  //       );

  //       const queryForProjection = MongooseQuery.forOne({
  //         criteria: criteriaForProjection,
  //         translateFields: this.translateFields,
  //         locale,
  //       });
  //       const criteria = queryForProjection.criteria();

  //       if (criteria) {
  //         this.#schemaForProjection(
  //           projection.$project,
  //           projection.$project.schema.whereToPutCriteria,
  //           criteria,
  //         );
  //       }

  //       Reflect.deleteProperty(projection.$project, 'schema');
  //     }

  //     aggregationArray.push(projection);
  //   });

  //   try {
  //     return await this.Model.aggregate(aggregationArray)
  //       .skip(query.skip)
  //       .limit(query.limit)
  //       .sort(query.sort);
  //   } catch (error) {
  //     return this.errorHandler(error);
  //   }
  // };


  // #schemaForProjection = (schema, placeToBe, criteria) => {
  //   const splitted = placeToBe.split('.');
  //   let data = schema[splitted[0]];

  //   for (let i = 1; i < splitted.length - 1; i++) {
  //     data = data[splitted[i]];
  //   }

  //   data.cond = criteria;
  // };
}
