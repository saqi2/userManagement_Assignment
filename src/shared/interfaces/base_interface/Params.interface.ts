export enum ParamTypes {
    NUMBER = 'number',
    STRING = 'string'
  }

export interface Params {
    paramName: string;
    paramType: ParamTypes;
    dataBaseField: string;
  }
