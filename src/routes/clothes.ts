'use strict';

import express, { Request, Response, NextFunction } from "express";
import { ClothesModel } from "../models";

export const router = express.Router();

router.get('/clothes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clothes = await ClothesModel.findAll();
    res.status(200).send(clothes);
  } catch (error) {
    next(error);
  }
});

router.get('/clothes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    const clothingItem = await ClothesModel.findByPk(id);
    res.status(200).send(clothingItem);
  } catch (error) {
    next(error);
  }
});

router.post('/clothes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newClothingItem = await ClothesModel.create(req.body);
    res.status(200).send(newClothingItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/clothes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    await ClothesModel.destroy({
      where: { id }
    });
    res.status(204).send(null);
  } catch (error) {
    next(error);
  }
});

router.put('/clothes/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = parseInt(req.params.id);
    console.log(id, req.body);
    const dbResponse = await ClothesModel.update( req.body, {
      where: { id },
      returning: true
    });
    console.log(`id = ${id}`, dbResponse);
    res.status(200).send(dbResponse[1][0]);
  } catch (error) {
    next(error);
  }
});
