import { Router } from 'express';
import { ListsController } from '../controllers/list.controller';


const listRouter = Router();

//생성
listRouter.post('/:boardId/lists', ListsController.createList);

// 조회
listRouter.get('/:boardId/lists', ListsController.getMyLists);

//수정 
listRouter.put('/:boardId/:listId', ListsController.updateList);

//삭제 
listRouter.delete('/:boardId/:listId', ListsController.deleteList);

export { listRouter };