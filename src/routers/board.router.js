import express from 'express';
import { BoardController } from '../controllers/board.controller.js';

const router = express.Router();
const boardController = new BoardController();

router.post('/boards', boardController.createBoard);
router.get('/boards', boardController.getBoard);
router.get('/boards/:boardId', boardController.getOneBoard);
router.put('/boards/:boardId', boardController.updateBoard);
router.delete('/boards/:boardId', boardController.deleteBoard);

export { router as BoardRouter };
