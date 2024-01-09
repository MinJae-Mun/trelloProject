import { Router } from 'express';
import { ListsController } from '../controllers/list.controller.js';

const listsController = new ListsController();

const listsRouter = Router();

//생성
//listsRouter.post('/:boardId', listsController.createList);
// 생성 테스트
listsRouter.post('/', listsController.createList);

// 조회
//listsRouter.get('/:boardId', listsController.getAllLists);
// 조회 테스트
listsRouter.get('/', listsController.getAllLists);

//수정 
//listsRouter.put('/:boardId/:listId', listsController.updateListName);
// 수정 테스트
listsRouter.put('/:listId', listsController.updateListName);

//삭제 
//listsRouter.delete('/:boardId/:listId', listsController.deleteList);
// 삭제 테스트
listsRouter.delete('/:listId', listsController.deleteList);


export { listsRouter };