import database from 'mongoose';
import { ok } from 'assert';


interface MongooseQueryInterface {
  criteria: [];
  orderBy: string;
  limit: number;
  page: number;
  isOr?: boolean
}


export class MongooseQuery {
  _criteria = [];
  sort = undefined;
  limit = undefined;
  skip = undefined;
  isOr = false;

  constructor (criteria, limit, page, orderBy, isOr = false) {
    this._criteria = [];
    this.limit = (limit && Number(limit)) || undefined;
    this.skip = (page && Number(page)) * (limit && Number(limit)) - 1 || undefined;
    this.sort = this._buildSort(orderBy);
    this.isOr = isOr;
    this.makeCriteria(criteria);
  }

  static forOne (criteria) {
    return new MongooseQuery(
      criteria, undefined, undefined, undefined,
    );
  }

  static forList ({ orderBy = undefined, limit = undefined, page = undefined, criteria = [],
  }: MongooseQueryInterface) {
    return new MongooseQuery(criteria, limit, page, orderBy, false);
  }

  static forAutocomplete ({ orderBy = undefined, limit = undefined, page = undefined, criteria = [],
  }: MongooseQueryInterface) {
    return new MongooseQuery(criteria, limit, page, orderBy, true);
  }


  appendEqual (column, value) {
    this._criteria.push({
      [column]: value,
    });
  }

  appendId (column, value) {
    let id = value;

    // If ID is invalid, mongodb throws an error.
    // For that not to happen, if the ObjectID is invalid, it sets
    // some random ObjectID
    if (!database.Types.ObjectId.isValid(id)) {
      id = database.Types.ObjectId.createFromTime(
        +new Date(),
      );
    }

    this._criteria.push({
      [column]: id,
    });
  }

  appendIn (column, value) {
    this._criteria.push({
      [column]: {
        $in: Array.isArray(value) ? value : [ value ],
      },
    });
  }

  appendIlike (column, value) {
    this._criteria.push({
      [column]: new RegExp(value, 'i'),
    });
  }

  appendElemMatch (column, value) {
    this._criteria.push({
      [column]: { $elemMatch: value }, // value must be an object like { id: 2 }
    });
  }

  appendCustom (column, value) {
    this._criteria.push({
      [column]: value,
    });
  }

  appendRange (column, value) {
    let start;
    let end;

    if (Array.isArray(value)) {
      [ start, end ] = value;
    } else {
      start = value;
    }

    if (start) {
      this._criteria.push({
        [column]: {
          $gte: start,
        },
      });
    }

    if (end) {
      this._criteria.push({
        [column]: {
          $lte: end,
        },
      });
    }
  }


  appendExists (column, exists = true) {
    this._criteria.push({
      [column]: { $exists: exists },
    });
  }

  reset () {
    this._criteria = [];
  }

  _buildSort (orderBy) {
    if (!orderBy) {
      return undefined;
    }

    let column = orderBy.split('_')[0];
    const order = orderBy.split('_')[1];

    if (column === 'id') {
      column = '_id';
    }

    return {
      [column]: order === 'asc' ? 1 : -1,
    };
  }

  criteria (queryEntityRelations = {}) {
    if (!this._criteria.length) {
      return {};
    } else if (!Reflect.ownKeys(queryEntityRelations).length) {
      return {
        $and: this._criteria,
      };
    }

    const criteria = {};

    for (const operator in queryEntityRelations) {
      queryEntityRelations[operator].map(relation => {
        this._criteria.map(field => {
          if (relation === Reflect.ownKeys(field)[0]) {
            if (!criteria[operator]) {
              criteria[operator] = [];
            }

            criteria[operator].push(field);
          }
        });
      });
    }

    return criteria;
  }
  makeCriteria (criteria = []) {
    ok(Array.isArray(criteria), 'criteria should be an Array');

    criteria.forEach(([ key, operator, value ]) => {
      key = key === 'id' ? '_id' : key;


      if (operator === 'like') this.appendIlike(key, value);
      else if (operator === 'in') this.appendIn(key, value);
      else if (operator === 'equal') this.appendEqual(key, value);
      else if (operator === 'range') this.appendRange(key, value);
      else if (operator === 'exists') this.appendExists(key, value);
      else if (operator === 'elemMatch') this.appendElemMatch(key, value);
      else if (operator === 'custom') this.appendCustom(key, value);
    });
  }
}
