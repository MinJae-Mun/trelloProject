import { Router } from 'express';
import { ListsController } from '../controllers/list.controller.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const listsController = new ListsController();

const listsRouter = Router();

//생성
listsRouter.post('/:boardId', isAuth, listsController.createList);


// 조회
listsRouter.get('/:boardId', isAuth, listsController.getAllLists);


//수정 
listsRouter.put('/:boardId/:listId', isAuth, listsController.updateListName);

// 리스트 이동 엔드포인트 확인 필요
listsRouter.put('/:boardId/:listId/:listOrder/move', isAuth, listsController.moveList);


//삭제 
listsRouter.delete('/:boardId/:listId', isAuth, listsController.deleteList);



export { listsRouter };