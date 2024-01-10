import express from 'express';
import { CardController } from '../controllers/card.controller.js';
// import { isAuth } from '../../middlewares/authMiddleware.js'
const router = express.Router();

const cardController = new CardController();

//isAuth 미들웨어 나중에 넣기.

//카드 상세 조회
router.get('/:boardId/:listId/card/:cardId', cardController.findCardDetail);

//카드 생성
router.post('/:boardId/:listId/card', cardController.createCard);

//카드 수정
router.put('/:boardId/:listId/card/:cardId', cardController.updateCard);

//카드 이동
router.patch('/:boardId/:listId/card/:cardId', cardController.moveCard);

//카드 삭제
router.delete('/:boardId/:listId/card/:cardId', cardController.deleteCard);

// * 카드 이동 -> 순서 이동에 대한거는 컬럼 추가가 필요한 것 같다. position 이라고 하자요
// * 같은 컬럼 내에서 카드의 위치를 변경할 수 있어야 합니다.
// * 카드를 다른 컬럼으로 이동할 수 있어야 합니다.

export { router as CardRouter };
