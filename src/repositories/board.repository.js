import { db } from '../../models/index.js';
// import { Sequelize } from 'sequelize';

const { Board, List, Card } = db;
export class BoardRepository {
    // # 보드 작성 API
    createBoard = async (UserId, title, detail, backgroundColor) => {
        let transaction;
        try {
            transaction = await sequelize.transaction();

            // 보드 생성
            const boardData = await Board.create(
                { UserId, title, detail, backgroundColor },
                { transaction },
            );

            await transaction.commit();

            return boardData;
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    };

    // # 보드 조회 API
    getBoard = async () => {
        return await Board.findAll({});
    };

    //  보드 접근 권한 조회
    boardAuth = async (boardId, userId) => {
        try {
            const haveAuth = await MembershipUsers.findOne({
                where: { UserId: userId, MembershipId: boardId },
                attributes: ['UserId'],
            });
            console.log('haveAuth :', typeof haveAuth, haveAuth);
            return haveAuth;
        } catch (error) {
            return { status: 400, message: `보드 읽기 권한 조회 실패` };
        }
    };

    // # 보드 id로 조회
    findOneBoard = async (boardId) => {
        const board = await Board.findOne({ where: { boardId: boardId } });
        const lists = await List.findAll({ where: { BoardId: boardId } });

        return {
            board,
            lists,
        };
    };

    // # 수정, 삭제, 초대에 필요한 id 조회
    findBoard = async (boardId) => {
        return await Board.findByPk(boardId);
    };

    // # 수정, 삭제, 초대에 필요한 id 조회
    findBoard = async (boardId) => {
        return await Board.findByPk(boardId);
    };

    // # 보드 수정 API
    updateBoard = async (boardId, title, detail) => {
        const updateValues = {};
        if (title) updateValues.title = title;
        if (detail) updateValues.detail = detail;
        const updateBoard = await Board.update(updateValues, {
            where: { boardId },
        });
        return updateBoard;
    };

    // # 보드 삭제 API
    deleteBoard = async (boardId) => {
        let transaction;
        try {
            transaction = await sequelize.transaction();

            await Board.destroy({ where: { boardId }, transaction });
            await Memberships.destroy({
                where: { membershipId: boardId },
                transaction,
            });
            await MembershipUsers.destroy({
                where: { membershipId: boardId },
                transaction,
            });

            await transaction.commit();
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    };
}

// module.exports = BoardRepository;
