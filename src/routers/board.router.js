import express from 'express';

const router = express.Router();
const BoardController = require('../1controllers/board_controller');
const boardController = new BoardController();

router.post('/boards', boardController.createBoard);
router.get('/boards', boardController.getBoard);
router.get('/boards/:boardId', boardController.getOneBoard);
router.put('/boards/:boardId', boardController.updateBoard);
router.delete('/boards/:boardId', boardController.deleteBoard);

module.exports = router;
