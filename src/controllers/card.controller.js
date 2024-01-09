import { CardService } from '../services/card.service.js';

export class CardController {
    cardService = new CardService();

    //카드 상세 조회
    //title, description null 로 추가, 코멘트 값 null로 추가, 작업자 변경 가능,

    findCardDetail = async (req, res, next) => {
        try {
            const card = await this.cardService.findCardDetail();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 액티비티 조회
    findActivityByCard = async (req, res, next) => {
        try {
            const card = await this.cardService.findActivityByCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 액티비티에 comment 조회
    getCommentByCard = async (req, res, next) => {
        try {
            const card = await this.cardService.getCommentByCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 생성
    //로그인 상태여야 하고, 보드 멤버로 보드에 접속해야 하고, 리스트 안에 들어와서 타이틀을 작성하면 작성 됨
    createCard = async (req, res, next) => {
        try {
            const { bmId, boardId, listId, title } = req.body;

            if (!bmId) {
                return res.status(400).json({
                    ok: false,
                    message: 'userId가 있어야함',
                });
            }
            if (!boardId) {
                return res.status(400).json({
                    ok: false,
                    message: 'userId가 있어야함',
                });
            }
            if (!listId) {
                return res.status(400).json({
                    ok: false,
                    message: 'userId가 있어야함',
                });
            }
            if (!title) {
                return res.status(400).json({
                    ok: false,
                    message: '타이틀만 있으면 되는데 그게 없네',
                });
            }

            const createdCard = await this.cardService.createCard(
                bmId,
                boardId,
                listId,
                title,
            );
            return res.status(200).json({
                ok: true,
                message: '리뷰 작성 성공',
                data: createdCard,
            });
        } catch (err) {
            next(err);
        }
    };

    //카드 수정 할 때
    // title 수정, description 값 null 상태에서 수정, 코멘트 값 null 에서 수정 가능, 작업자 할당 null 에서 할당 가능, 작업자 변경 가능,
    updateCard = async (req, res, next) => {
        try {
            const {
                bmId,
                boardId,
                listId,
                cardId,
                title,
                description,
                comment,
            } = req.body;

            //코멘트 수정도 여기서 일단 해볼게요
            if (!comment) {
                return res.status(400).json({
                    ok: false,
                    message: '한가지 이상은 변경해야 합니다',
                });
            }

            const card = await this.cardService.createCard(title, description);
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 이동
    moveCard = async (req, res, next) => {
        try {
            const card = await this.cardService.moveCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 삭제
    deleteCard = async (req, res, next) => {
        try {
            const card = await this.cardService.deleteCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };
}
// 카드 생성
//     * 컬럼 내부에 카드를 생성할 수 있어야 합니다.

// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
//     * 작업자 할당????????
//     * 작업자 변경????????
