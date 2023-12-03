import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { AddTableMail1700555976577 } from './1700555976577-AddTableMail';
import { CreateTableTemplate1701400687844 } from './1701400687844-CreateTableTemplate';
import { AddMailPermission1701509428731 } from './1701509428731-AddMailPermission';
import { AddColumnImageToTemplate1701594237013 } from './1701594237013-AddColumnImageToTemplate';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  entities: [],
  migrations: [AddTableMail1700555976577, CreateTableTemplate1701400687844, AddMailPermission1701509428731, AddColumnImageToTemplate1701594237013],
});
