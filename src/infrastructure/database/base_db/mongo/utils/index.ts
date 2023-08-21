export * from './MongooseQuery.util';

export const returnType = (data) => {
  return Object.prototype.toString.call(data).split(' ')[1].replace(']', '');
};


export const createFlatObject = (obj, nonFlatFields = [], prefix = '', res = {}) => {
  return Object.entries(obj).reduce((r, [ key, val ]) => {
    const k = `${prefix}${key}`;

    if (returnType(val) === 'Object') {
      nonFlatFields.map((field) => {
        if (key !== field) {
          createFlatObject(val, [], `${k}.`, r);
        } else {
          res[k] = val;
        }
      });
    } else {
      res[k] = val;
    }

    return r;
  }, res);
};
