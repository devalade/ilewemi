import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } =
  process.env;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'ilewemi',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
