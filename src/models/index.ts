'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import clothesSchema from './clothes.schema';
import foodSchema from './foods.schema';

dotenv.config();

const DATABASE_URL: string = process.env.NODE_ENV === 'test' ?
  'sqlite::memory' :
  process.env.DATABASE_URL!;

// const DATABASE_URL = process.env.DATABASE_URL!

export const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export const ClothesModel = clothesSchema(sequelizeDatabase);
export const FoodModel = foodSchema(sequelizeDatabase);