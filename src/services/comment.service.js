import { CommentRepository } from '../repositories/comment.repository.js';
import { UserService } from './user.service.js';

export class CommentService {
    commentRepository = new CommentRepository();
    userService = new UserService();

    createCommentById = async (createCommentData) => {
        const { userId } = createCommentData;

        const user = await this.userService.getUserById(userId);

        if (!user) {
            const error = new Error('존재하지 않는 사용자입니다.');
            error.status = 404;
            throw error;
        }

        const result = await this.commentRepository.createCommentOne(
            createCommentData,
        );

        return {
            ok: true,
            message: '댓글을 등록하였습니다.',
            data: result,
        };
    };

    findCommentsById = async (cardId) => {
        const comments = await this.commentRepository.findComments(cardId);
        return {
            ok: true,
            message: '댓글을 조회하였습니다.',
            data: comments,
        };
    };

    updateCommentById = async (commentId, body) => {
        return await this.commentRepository.updateCommentOne(commentId, body);
    };

    deleteCommentById = async (commentId) => {
        return await this.commentRepository.deleteCommentOne(commentId);
    };
}
