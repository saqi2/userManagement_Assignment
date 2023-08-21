import { Request } from 'express';

interface NewFieldToReq {
  dataFromMiddleware: {
    _id: number;
    created_at: Date;
    update_at: Date;
  };
  user: { id: number };
  headers: { authorization: string };
}
export type NewRequest = Request & NewFieldToReq;
