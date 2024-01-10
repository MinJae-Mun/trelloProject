import { db } from '../../models/index.js';

const { Comment } = db;

export class CommentRepository {
    findComment = async (commentId) => {
        const comment = await db.Comment.findOne({
            where: {
                commentId,
            },
        });
        return comment;
    };

    createCommentOne = async (createCommentData) => {
        const result = await db.Comment.create({
            ...createCommentData,
        });
        return result;
    };

    findComments = async (cardId) => {
        const comments = await db.Comment.findAll({
            where: {
                cardId: cardId,
            },
        });
        return comments;
    };

    updateCommentOne = async (commentId, data) => {
        const comment = await this.findComment(commentId);

        const result = await Comment.update(
            {
                ...data,
            },
            {
                where: {
                    commentId,
                },
            },
        );

        return result;
    };

    deleteCommentOne = async (commentId) => {
        const result = await db.Comment.destroy({ where: { commentId } });
        return result;
    };
}
