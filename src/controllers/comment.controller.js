import { CommentService } from '../services/comment.service.js';

export class CommentController {
    commentService = new CommentService();

    createComment = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const cardId = req.params.cardId;
            const createCommentData = {
                ...req.body,
                userId,
                cardId,
            };

            const isValidData = 'description' in createCommentData;

            if (!isValidData) {
                const error = new Error('유효하지 않은 데이터입니다.');
                error.status = 400;
                throw error;
            }

            const result = await this.commentService.createCommentById(
                createCommentData,
            );

            return res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    getComment = async (req, res, next) => {
        try {
            const cardId = req.params.cardId;

            const result = await this.commentService.findCommentsById(cardId);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    updateComment = async (req, res, next) => {
        try {
            const commentId = req.params.commentId;
            const body = req.body;
            await this.commentService.updateCommentById(commentId, body);

            return res.status(200).json({
                ok: true,
                message: '댓글을 수정하였습니다.',
            });
        } catch (err) {
            next(err);
        }
    };

    deleteComment = async (req, res, next) => {
        try {
            const commentId = req.params.commentId;
            await this.commentService.deleteCommentById(commentId);

            return res.status(200).json({
                ok: true,
                message: '댓글을 삭제하였습니다.',
            });
        } catch (err) {
            next(err);
        }
    };
}
