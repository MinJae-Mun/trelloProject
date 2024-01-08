import express from 'express';
import { BoardController } from '../controllers/boardController';

const boardRouter = express.Router();

boardRouter.get('/:id', protectedMiddleware, BoardController);

export default boardRouter;
