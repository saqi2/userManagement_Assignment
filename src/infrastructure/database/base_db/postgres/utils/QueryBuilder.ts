import { ok } from 'assert';
import { Op } from 'sequelize';

interface Query {
  criteria: [];
  orderBy?: string;
  limit?: number;
  page?: number;
  isOr?: boolean;
}
export class QueryBuilder {
  limit = undefined;
  skip = undefined;
  options = undefined;
  _criteria = {};
  constructor (criteria, options = {}, limit?, page?, orderBy?) {
    this.limit = (limit && Number(limit)) || undefined;
    this.skip =
      (page && Number(page)) * (limit && Number(limit)) - 1 || undefined;
    this.options = options;
    this.makeCriteria(criteria);
  }

  static forOne ({ criteria }: Query, options?) {
    return new QueryBuilder(criteria, options);
  }

  static forList ({
    orderBy = undefined,
    limit = undefined,
    page = undefined,
    criteria = [],
  }: Query, options?) {
    return new QueryBuilder(criteria, options, limit, page, orderBy);
  }

  appendILike (column, value) {
    this._criteria[ column ] = {
      [ Op.or ]: [
        {
          [ Op.like ]: `${ value }%`,
        },
        {
          [ Op.like ]: `%${ value }`,
        },
      ],
    };
  }

  appendBetween (column, value) {
    this._criteria[ column ] = {
      [ Op.between ]: value,
    };
  }

  appendEqual (column, value) {
    this._criteria[ column ] = {
      [ Op.eq ]: value,
    };
  }

  appendIn (column, value) {
    this._criteria[ column ] = value;
  }

  appendRange (column, value) {
    let start;
    let end;
    this._criteria[ column ] = {};

    if (Array.isArray(value)) {
      [ start, end ] = value;
    } else {
      start = value;
    }

    if (start) {
      this._criteria[ column ][ Op.gte ] = start;
    }

    if (end) {
      this._criteria[ column ][ Op.lte ] = end;
    }
  }

  criteria (queryEntityRelations = {}) {
    if (!Reflect.ownKeys(queryEntityRelations).length) {
      return {
        where: this._criteria,
        returning: true,
        include: this.options.relation,
      };
    }


    const criteria = {};
    let newOperator: any;

    for (const operator in queryEntityRelations) { // example {$or: ['id' , 'email'] }
      switch (operator) {
        case 'or':
          newOperator = Op.or;
          break;
        default:
      }

      queryEntityRelations[ operator ].map(relation => {
        for (const field in this._criteria) {
          if (relation === field) {
            if (!criteria[ newOperator ]) {
              criteria[ newOperator ] = [];
            }

            criteria[ newOperator ].push({ [ field ]: this._criteria[ field ] });
          }
        }
      });
    }


    return {
      where: criteria,
      returning: true,
      include: this.options.relation,
    };
  }
  makeCriteria (criteria) {
    ok(Array.isArray(criteria), 'criteria should be an Array');
    criteria.forEach(([ column, operator, value ]) => {
      if (operator === 'like') this.appendILike(column, value);
      else if (operator === 'between') this.appendBetween(column, value);
      else if (operator === 'equal') this.appendEqual(column, value);
      else if (operator === 'range') this.appendRange(column, value);
      else if (operator === 'in') this.appendIn(column, value);
    });
  }
}
