import express from 'express';
import { BoardController } from '../controllers/board.controller.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = express.Router();
const boardController = new BoardController();

router.post('/boards', isAuth, boardController.createBoard);
router.get('/boards', isAuth, boardController.getBoard);
router.get('/boards/:boardId', isAuth, boardController.getOneBoard);
router.put('/boards/:boardId', isAuth, boardController.updateBoard);
router.delete('/boards/:boardId', isAuth, boardController.deleteBoard);

export { router as BoardRouter };
