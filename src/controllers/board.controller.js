import { BoardService } from '../services/board.service.js';

export class BoardController {
    boardService = new BoardService();

    // # 보드 생성 API
    createBoard = async (req, res) => {
        const { userId } = res.locals.user;
        const { title, detail } = req.body;
        try {
            if (!title || !detail) {
                return res.status(412).json({
                    errorMessage: 'title과 detail 모두 작성해주세요.',
                });
            }
            const boardData = await this.boardService.createBoard(
                userId,
                title,
                detail,
            );
            return res
                .status(201)
                .json({ data: boardData, message: '보드가 생성되었습니다.' });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ errorMessage: '보드 생성에 실패하였습니다.' });
        }
    };

    // # 보드 조회 API
    getBoard = async (req, res) => {
        try {
            const boards = await this.boardService.getBoard();
            return res.status(200).json({ boards });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ errorMessage: '보드 조회에 실패하였습니다.' });
        }
    };

    // 보드 상세 조회 API
    getOneBoard = async (req, res) => {
        const { boardId } = req.params;
        const { userId } = res.locals.user;
        try {
            const board = await this.boardService.findOneBoard(boardId, userId);
            return res.status(200).json(board);
        } catch (error) {
            return res.status(400).json({ errorMessage: error.message });
        }
    };

    // # 보드 수정 API
    updateBoard = async (req, res) => {
        const { userId } = res.locals.user;
        const { boardId } = req.params;
        const { title, detail } = req.body;
        try {
            const boardUpdate = await this.boardService.updateBoard(
                userId,
                boardId,
                title,
                detail,
                backgroundColor,
            );
            return res.status(200).json({ message: boardUpdate });
        } catch (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    };

    // # 보드 삭제 API
    deleteBoard = async (req, res) => {
        const { userId } = res.locals.user;
        const { boardId } = req.params;
        try {
            const boardDelete = await this.boardService.deleteBoard(
                userId,
                boardId,
            );
            return res.status(200).json({ message: boardDelete });
        } catch (error) {
            return res.status(500).json({ errorMessage: error.message });
        }
    };
}
// module.exports = BoardController;
