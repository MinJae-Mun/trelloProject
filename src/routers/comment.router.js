import express from 'express';
import { CommentController } from '../controllers/comment.controller.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const commentController = new CommentController();
const router = express.Router();

// 생성
router.post(
    '/:boardId/:listId/:cardId',
    isAuth,
    commentController.createComment,
);

// 조회
router.get('/:boardId/:listId/:cardId', isAuth, commentController.getComment);

// 수정
router.patch(
    '/:boardId/:listId/:cardId/:commentId',
    isAuth,
    commentController.updateComment,
);

// 삭제
router.delete(
    '/:boardId/:listId/:cardId/:commentId',
    isAuth,
    commentController.deleteComment,
);

export { router as CommentRouter };
