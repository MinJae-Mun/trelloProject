const BoardRepository = require('../repositories/board.repository');

class BoardService {
    boardRepository = new BoardRepository();

    // # 보드 생성 API
    createBoard = async (UserId, title, detail) => {
        const boardData = await this.boardRepository.createBoard(
            UserId,
            title,
            detail,
            backgroundColor,
        );
        return {
            boardId: boardData.boardId,
            userId: boardData.UserId,
            title: boardData.title,
            detail: boardData.detail,
            backgroundColor: boardData.backgroundColor,
            createdAt: boardData.createdAt,
            updatedAt: boardData.updatedAt,
        };
    };

    // # 보드 조회 API
    getBoard = async () => {
        return await this.boardRepository.getBoard();
    };

    // 보드 번호로 조회 API
    findOneBoard = async (boardId, userId) => {
        if (!boardId) {
            throw new Error('보드 번호를 입력해주세요.');
        }

        try {
            const haveAuthResult = await this.boardRepository.boardAuth(
                boardId,
                userId,
            );

            if (haveAuthResult === null) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            if (haveAuthResult.UserId !== userId) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            const { board, lists } = await this.boardRepository.findOneBoard(
                boardId,
            );
            if (!board) {
                throw new Error('보드 번호를 다시 확인해주세요.');
            }

            const ownLists = lists.map((list) => list.listId);

            return {
                boardId: board.boardId,
                userId: board.UserId,
                title: board.title,
                detail: board.detail,
                backgroundColor: board.backgroundColor,
                createdAt: board.createdAt,
                updatedAt: board.updatedAt,
                ownLists: ownLists,
            };
        } catch (error) {
            throw new Error(error);
        }
    };

    // # 보드 수정 API
    updateBoard = async (userId, boardId, title, detail) => {
        try {
            const updatedBoard = await this.boardRepository.findBoard(boardId);

            if (!updatedBoard) {
                return {
                    status: 400,
                    message: `보드가 존재하지 않습니다.`,
                };
            }

            const haveAuthResult = await this.boardRepository.boardAuth(
                boardId,
                userId,
            );

            if (haveAuthResult === null) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            if (haveAuthResult.UserId !== userId) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            if (userId !== updatedBoard.UserId) {
                // return res.status(412).json({errorMessage: '권한이 존재하지 않습니다.'});
                return {
                    status: 404,
                    message: '권한이 존재하지 않습니다.',
                };
            }
            const updateBoardResult = await this.boardRepository.updateBoard(
                boardId,
                title,
                detail,
            );

            if (!updateBoardResult) {
                return {
                    status: 200,
                    message: `보드 ${boardId}번 수정에 실패했습니다.`,
                };
            }

            return {
                status: 200,
                message: `보드 ${boardId}번 수정에 성공했습니다.`,
            };
        } catch (error) {
            throw new Error(error);
        }
    };

    // # 보드 삭제 API
    deleteBoard = async (userId, boardId) => {
        try {
            const deletedBoard = await this.boardRepository.findBoard(boardId);
            if (!deletedBoard) {
                return res
                    .status(404)
                    .json({ errorMessage: '보드가 존재하지 않습니다.' });
            }

            const haveAuthResult = await this.boardRepository.boardAuth(
                boardId,
                userId,
            );

            if (haveAuthResult === null) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            if (haveAuthResult.UserId !== userId) {
                return {
                    status: 400,
                    message: `보드 ${boardId}번에 접근 권한이 없습니다.`,
                };
            }

            const deleteBoardResult = await this.boardRepository.deleteBoard(
                boardId,
            );
            console.log(
                'deleteBoardResult :',
                typeof deleteBoardResult,
                deleteBoardResult,
            );

            return {
                status: 200,
                message: `보드 ${boardId}번 수정에 성공했습니다.`,
            };
        } catch (error) {
            throw new Error(error);
        }
    };
}
module.exports = BoardService;
