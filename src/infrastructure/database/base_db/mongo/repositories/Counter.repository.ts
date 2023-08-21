import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from 'src/infrastructure/database/base_db/mongo/models/counter.model';

@Injectable()
export class CounterRepository {
  constructor (
    @InjectModel(Counter.name)
    private readonly counter: Model<CounterDocument>,
  ) {}

   getNext: (collectionName: string) => Promise<number> = (collectionName) => {
     return this.counter
       .findOneAndUpdate(
         { collectionName },
         { $inc: { nextId: 1 } },
         { upsert: true, new: true, setDefaultsOnInsert: true },
       )
       .then((data) => data.nextId);
   };

  deleteCollection: (collectionName: string) => any = (collectionName) => {
    // TODO create an interface for delete response
    return this.counter.deleteOne({ collectionName });
  };

  reset: (collectionName: string) => void = async (collectionName) => {
    await this.counter.deleteOne({ collectionName });
    this.counter.create({ collectionName });
  };

  // resetAll: (collectionName: Counter[]) => void = async (models) => {
  //   await this.counter.remove();
  //   await this.counter.insertMany(
  //     models.map((model) => ({ collectionName: model })),
  //     { setDefaultsOnInsert: true },
  //   );
  // };
}
