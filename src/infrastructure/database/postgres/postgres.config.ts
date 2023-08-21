import { Logger } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { databaseConfig } from 'config/app.config';

export const postgresConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.dbName,
  models: [ 'src/infrastructure/database/postgres/models/*.model.ts' ],
  autoLoadModels: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  synchronize: databaseConfig.synchronize, // don,t use in production
  logging: sequelizeLogger,
};

function sequelizeLogger (sql: string): void {
  Logger.debug(`\n [Sequelize Query]:  ${sql}`);
}
